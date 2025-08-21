package com.ttoannguyen.lemongrass.search.service;

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.search.document.RecipeDocument;
import com.ttoannguyen.lemongrass.search.dto.SearchRequest;
import com.ttoannguyen.lemongrass.search.service.embedding.EmbeddingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchService {
  ElasticsearchAsyncClient elasticsearchAsyncClient;
  ObjectMapper objectMapper; // Để parse JSON từ embededService
  EmbeddingService embeddingService; // Giả định bạn đã inject EmbededService

  private List<Float> getQueryVector(String keyword) {
    try {
      // Gọi embededService để lấy embedding
      float[] jsonResult = embeddingService.embedOne(keyword);
      //      JsonNode jsonNode = objectMapper.readTree(jsonResult);
      //      JsonNode embeddingNode = jsonNode.get("embedding");
      //      if (embeddingNode == null || !embeddingNode.isArray() || embeddingNode.size() != 384)
      // {
      //        log.error("Invalid embedding format or dimension for keyword: {}", keyword);
      //        throw new AppException(ErrorCode.INVALID_KEY);
      //      }
      List<Float> list = new ArrayList<>();
      for (float value : jsonResult) {
        list.add(value);
      }
      // Chuyển JsonNode thành mảng float
      //      float[] vector = new float[384];
      //      for (int i = 0; i < 384; i++) {
      //        vector[i] = embeddingNode.get(i).floatValue();
      //      }
      return list;
    } catch (IOException e) {
      log.error("Failed to parse embedding for keyword: {}", keyword, e);
      throw new AppException(ErrorCode.INVALID_KEY);
    }
  }

  public CompletableFuture<List<RecipeDocument>> search(SearchRequest request) {
    log.debug("Starting search with request: {}", request);

    if (request.getKeyword() == null || request.getKeyword().isEmpty()) {
      log.error("Search keyword is required");
      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
    }

    List<Query> shouldQueries = new ArrayList<>();
    List<Query> filterQueries = new ArrayList<>();

    // Always filter out deleted recipes
    filterQueries.add(Query.of(q -> q.term(t -> t.field("isDeleted").value(FieldValue.of(false)))));

    // Text-based query for title, description, and accountName
    shouldQueries.add(
        Query.of(
            q ->
                q.queryString(
                    qs ->
                        qs.fields(List.of("title^3", "description^0.5", "accountName^0.5"))
                            .query(request.getKeyword())
                            .defaultOperator(Operator.And)
                            .analyzer("vietnamese_analyzer")
                            .fuzziness("0"))));

    // Nested query for ingredients.name
    shouldQueries.add(
        Query.of(
            q ->
                q.nested(
                    n ->
                        n.path("ingredients")
                            .query(
                                nq ->
                                    nq.match(
                                        m ->
                                            m.field("ingredients.name")
                                                .query(request.getKeyword())
                                                .analyzer("vietnamese_analyzer")
                                                .operator(Operator.And)
                                                .fuzziness("0"))))));

    // Nested query for instructions.description
    shouldQueries.add(
        Query.of(
            q ->
                q.nested(
                    n ->
                        n.path("instructions")
                            .query(
                                nq ->
                                    nq.match(
                                        m ->
                                            m.field("instructions.description")
                                                .query(request.getKeyword())
                                                .analyzer("vietnamese_analyzer")
                                                .operator(Operator.And)
                                                .fuzziness("AUTO"))))));

    // Vector-based query using knn
    try {
      List<Float> queryVector = getQueryVector(request.getKeyword());
      shouldQueries.add(
          Query.of(
              q ->
                  q.knn(
                      k ->
                          k.field("titleVector")
                              .queryVector(queryVector)
                              .k(10)
                              .numCandidates(100)
                              .boost(2.0f))));
      shouldQueries.add(
          Query.of(
              q ->
                  q.knn(
                      k ->
                          k.field("descriptionVector")
                              .queryVector(queryVector)
                              .k(10)
                              .numCandidates(100)
                              .boost(1.0f))));
      shouldQueries.add(
          Query.of(
              q ->
                  q.knn(
                      k ->
                          k.field("ingredientsVector")
                              .queryVector(queryVector)
                              .k(10)
                              .numCandidates(100)
                              .boost(1.5f))));
    } catch (AppException e) {
      log.warn("Vector search skipped due to embedding error: {}", e.getMessage());
    }

    // Add filters for categoryIds and difficulty
    if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
      filterQueries.add(
          Query.of(
              q ->
                  q.terms(
                      t ->
                          t.field("categoryIds")
                              .terms(
                                  ts ->
                                      ts.value(
                                          request.getCategoryIds().stream()
                                              .map(FieldValue::of)
                                              .collect(Collectors.toList()))))));
    }

    if (request.getDifficulty() != null && !request.getDifficulty().isEmpty()) {
      filterQueries.add(
          Query.of(
              q ->
                  q.term(
                      t -> t.field("difficulty").value(FieldValue.of(request.getDifficulty())))));
    }

    // Build final bool query
    Query finalQuery =
        Query.of(
            q ->
                q.bool(b -> b.should(shouldQueries).filter(filterQueries).minimumShouldMatch("1")));

    // Log query for debugging
    log.debug("Executing Elasticsearch search query: {}", finalQuery);

    // Execute search
    return elasticsearchAsyncClient
        .search(s -> s.index("recipes").query(finalQuery).from(0).size(10), RecipeDocument.class)
        .thenApply(
            response -> {
              log.debug("Search completed, hits: {}", response.hits().hits().size());
              return response.hits().hits().stream()
                  .filter(hit -> hit.source() != null)
                  .map(Hit::source)
                  .collect(Collectors.toList());
            })
        .exceptionally(
            throwable -> {
              log.error("Search failed: {}", throwable.getMessage(), throwable);
              throw new AppException(ErrorCode.SEARCH_FAILED);
            });
  }

  public CompletableFuture<List<RecipeDocument>> autocomplete(String keyword) {
    log.debug("Starting autocomplete with keyword: {}", keyword);
    if (keyword == null || keyword.isEmpty()) {
      log.error("Autocomplete keyword is required");
      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
    }

    Query autocompleteQuery =
        Query.of(
            q ->
                q.multiMatch(
                    m ->
                        m.query(keyword)
                            .fields(List.of("title.suggest^2", "ingredients.name.suggest"))
                            .type(TextQueryType.BoolPrefix)
                            .analyzer("vietnamese_suggest_analyzer")));

    Query finalQuery =
        Query.of(
            q ->
                q.bool(
                    b ->
                        b.must(autocompleteQuery)
                            .filter(
                                Query.of(
                                    f ->
                                        f.term(
                                            t ->
                                                t.field("isDeleted")
                                                    .value(FieldValue.of(false)))))));

    return elasticsearchAsyncClient
        .search(
            s ->
                s.index("recipes")
                    .query(finalQuery)
                    .size(5)
                    .source(
                        src -> src.filter(f -> f.includes(List.of("title", "ingredients.name"))))
                    .highlight(
                        h ->
                            h.fields("title.suggest", f -> f)
                                .fields("ingredients.name.suggest", f -> f)),
            RecipeDocument.class)
        .thenApply(
            response -> {
              log.debug("Autocomplete completed, hits: {}", response.hits().hits().size());
              return response.hits().hits().stream()
                  .filter(hit -> hit.source() != null)
                  .map(
                      hit -> {
                        RecipeDocument doc = hit.source();
                        doc.setHighlight(hit.highlight());
                        doc.setId(hit.id());

                        return doc;
                      })
                  .collect(Collectors.toList());
            })
        .exceptionally(
            throwable -> {
              log.error("Autocomplete failed: {}", throwable.getMessage(), throwable);
              throw new AppException(ErrorCode.SEARCH_FAILED);
            });
  }

  public CompletableFuture<List<RecipeDocument>> naturalSearch(String keyword) {
    log.debug("Starting natural search with keyword: {}", keyword);

    if (keyword == null || keyword.isEmpty()) {
      log.error("Search keyword is required");
      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
    }

    List<Query> shouldQueries = new ArrayList<>();

    // Text-based query for title, description, and ingredients
    shouldQueries.add(
        Query.of(
            q ->
                q.multiMatch(
                    m ->
                        m.query(keyword)
                            .fields(
                                List.of(
                                    "title^2",
                                    "title.suggest^1.5",
                                    "title.trigram",
                                    "description",
                                    "description.suggest"))
                            .analyzer("vietnamese_analyzer")
                            .type(TextQueryType.BestFields))));

    shouldQueries.add(
        Query.of(
            q ->
                q.nested(
                    n ->
                        n.path("ingredients")
                            .query(
                                nq ->
                                    nq.multiMatch(
                                        m ->
                                            m.query(keyword)
                                                .fields(
                                                    List.of(
                                                        "ingredients.name^1.5",
                                                        "ingredients.name.suggest"))
                                                .analyzer("vietnamese_analyzer")
                                                .type(TextQueryType.BestFields))))));

    // Vector-based query using knn
    try {
      List<Float> queryVector = getQueryVector(keyword);
      shouldQueries.add(
          Query.of(
              q ->
                  q.knn(
                      k ->
                          k.field("titleVector")
                              .queryVector(queryVector)
                              .k(10)
                              .numCandidates(100)
                              .boost(2.0f))));
      shouldQueries.add(
          Query.of(
              q ->
                  q.knn(
                      k ->
                          k.field("descriptionVector")
                              .queryVector(queryVector)
                              .k(10)
                              .numCandidates(100)
                              .boost(1.0f))));
      shouldQueries.add(
          Query.of(
              q ->
                  q.knn(
                      k ->
                          k.field("ingredientsVector")
                              .queryVector(queryVector)
                              .k(10)
                              .numCandidates(100)
                              .boost(1.5f))));
    } catch (AppException e) {
      log.warn("Vector search skipped due to embedding error: {}", e.getMessage());
    }

    // Build final bool query
    Query finalQuery =
        Query.of(
            q ->
                q.bool(
                    b ->
                        b.should(shouldQueries)
                            .filter(
                                Query.of(
                                    f ->
                                        f.term(
                                            t -> t.field("isDeleted").value(FieldValue.of(false)))))
                            .minimumShouldMatch("1")));

    // Execute search
    return elasticsearchAsyncClient
        .search(
            s ->
                s.index("recipes")
                    .query(finalQuery)
                    .size(10)
                    .source(
                        src ->
                            src.filter(
                                f ->
                                    f.includes(
                                        List.of("title", "ingredients.name", "description"))))
                    .highlight(
                        h ->
                            h.fields("title", f -> f)
                                .fields("title.suggest", f -> f)
                                .fields("ingredients.name", f -> f)
                                .fields("ingredients.name.suggest", f -> f)
                                .fields("description", f -> f)
                                .fields("description.suggest", f -> f)),
            RecipeDocument.class)
        .thenApply(
            response -> {
              log.debug("Natural search completed, hits: {}", response.hits().hits().size());
              return response.hits().hits().stream()
                  .filter(hit -> hit.source() != null)
                  .map(
                      hit -> {
                        RecipeDocument doc = hit.source();
                        doc.setHighlight(hit.highlight());
                        return doc;
                      })
                  .collect(Collectors.toList());
            })
        .exceptionally(
            throwable -> {
              log.error("Natural search failed: {}", throwable.getMessage(), throwable);
              throw new AppException(ErrorCode.SEARCH_FAILED);
            });
  }

  //  public CompletableFuture<List<RecipeDocument>> search(SearchRequest request) {
  //    log.debug("Starting search with request: {}", request);
  //
  //    if (request.getKeyword() == null || request.getKeyword().isEmpty()) {
  //      log.error("Search keyword is required");
  //      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
  //    }
  //
  //    // Build query
  //    List<Query> shouldQueries = new ArrayList<>();
  //    List<Query> filterQueries = new ArrayList<>();
  //
  //    // Always filter out deleted recipes
  //    filterQueries.add(Query.of(q -> q.term(t -> t.field("isDeleted").value(false))));
  //
  //    // Query string for non-nested fields
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.queryString(
  //                    qs ->
  //                        qs.fields(List.of("title^2", "description", "accountName"))
  //                            .query(request.getKeyword())
  //                            .defaultOperator(
  //                                co.elastic.clients.elasticsearch._types.query_dsl.Operator.And)
  //                            .fuzziness("AUTO"))));
  //
  //    //    // Nested query for tags.name
  //    //    shouldQueries.add(
  //    //        Query.of(
  //    //            q ->
  //    //                q.nested(
  //    //                    n ->
  //    //                        n.path("tags")
  //    //                            .query(
  //    //                                nq ->
  //    //                                    nq.match(
  //    //                                        m ->
  //    //                                            m.field("tags.name")
  //    //                                                .query(request.getKeyword())
  //    //                                                .operator(Operator.And)
  //    //                                                .fuzziness("AUTO"))))));
  //
  //    // Nested query for ingredients.name
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.nested(
  //                    n ->
  //                        n.path("ingredients")
  //                            .query(
  //                                nq ->
  //                                    nq.match(
  //                                        m ->
  //                                            m.field("ingredients.name")
  //                                                .query(request.getKeyword())
  //                                                .operator(Operator.And)
  //                                                .fuzziness("AUTO"))))));
  //
  //    // Nested query for instructions.description
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.nested(
  //                    n ->
  //                        n.path("instructions")
  //                            .query(
  //                                nq ->
  //                                    nq.match(
  //                                        m ->
  //                                            m.field("instructions.description")
  //                                                .query(request.getKeyword())
  //                                                .operator(Operator.And)
  //                                                .fuzziness("AUTO"))))));
  //
  //    // Add filters for categoryIds and difficulty
  //    if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
  //      filterQueries.add(
  //          Query.of(
  //              q ->
  //                  q.terms(
  //                      t ->
  //                          t.field("categoryIds")
  //                              .terms(
  //                                  ts ->
  //                                      ts.value(
  //                                          request.getCategoryIds().stream()
  //                                              .map(FieldValue::of)
  //                                              .collect(Collectors.toList()))))));
  //    }
  //
  //    if (request.getDifficulty() != null && !request.getDifficulty().isEmpty()) {
  //      filterQueries.add(
  //          Query.of(q -> q.term(t -> t.field("difficulty").value(request.getDifficulty()))));
  //    }
  //
  //    // Build final bool query
  //    Query finalQuery =
  //        Query.of(
  //            q ->
  //                q.bool(b ->
  // b.should(shouldQueries).filter(filterQueries).minimumShouldMatch("1")));
  //
  //    // Log query for debugging
  //    log.debug("Executing Elasticsearch search query: {}", finalQuery.toString());
  //
  //    // Execute search
  //    return elasticsearchAsyncClient
  //        .search(s -> s.index("recipes").query(finalQuery).from(0).size(10),
  // RecipeDocument.class)
  //        .thenApply(
  //            response -> {
  //              log.debug("Search completed, hits: {}", response.hits().hits().size());
  //              return response.hits().hits().stream()
  //                  .filter(hit -> hit.source() != null)
  //                  .map(Hit::source)
  //                  .collect(Collectors.toList());
  //            })
  //        .exceptionally(
  //            throwable -> {
  //              log.error("Search failed: {}", throwable.getMessage(), throwable);
  //              throw new AppException(ErrorCode.SEARCH_FAILED);
  //            });
  //  }

  //  public CompletableFuture<List<RecipeDocument>> autocomplete(String keyword) {
  //    log.debug("Starting autocomplete with keyword: {}", keyword);
  //    if (keyword == null || keyword.isEmpty()) {
  //      log.error("Autocomplete keyword is required");
  //      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
  //    }
  //
  //    Query autocompleteQuery =
  //        Query.of(
  //            q ->
  //                q.multiMatch(
  //                    m ->
  //                        m.query(keyword)
  //                            .fields(List.of("title.suggest", "ingredients.name.suggest"))
  //                            .type(TextQueryType.BoolPrefix)
  //                            .analyzer("vietnamese_suggest_analyzer")));
  //
  //    Query finalQuery =
  //        Query.of(
  //            q ->
  //                q.bool(
  //                    b ->
  //                        b.must(autocompleteQuery)
  //                            .filter(
  //                                Query.of(f -> f.term(t ->
  // t.field("isDeleted").value(false))))));
  //
  //    return elasticsearchAsyncClient
  //        .search(
  //            s ->
  //                s.index("recipes")
  //                    .query(finalQuery)
  //                    .size(5)
  //                    .source(
  //                        src -> src.filter(f -> f.includes(List.of("title",
  // "ingredients.name"))))
  //                    .highlight(
  //                        h ->
  //                            h.fields("title.suggest", f -> f)
  //                                .fields("ingredients.name.suggest", f -> f)),
  //            RecipeDocument.class)
  //        .thenApply(
  //            recipeDocumentSearchResponse -> {
  //              log.debug(
  //                  "Autocomplete completed, hits: {}",
  //                  recipeDocumentSearchResponse.hits().hits().size());
  //              return recipeDocumentSearchResponse.hits().hits().stream()
  //                  .filter(hit -> hit.source() != null)
  //                  .map(
  //                      hit -> {
  //                        RecipeDocument doc = hit.source();
  //                        doc.setHighlight(hit.highlight());
  //                        return doc;
  //                      })
  //                  .collect(Collectors.toList());
  //            })
  //        .exceptionally(
  //            throwable -> {
  //              log.error("Autocomplete failed: {} ", throwable.getMessage(), throwable);
  //              throw new AppException(ErrorCode.SEARCH_FAILED);
  //            });
  //  }
  //
  //  public CompletableFuture<List<RecipeDocument>> naturalSearch(String keyword) {
  //    log.debug("Starting natural search with keyword: {}", keyword);
  //
  //    if (keyword == null || keyword.isEmpty()) {
  //      log.error("Search keyword is required");
  //      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
  //    }
  //
  //    List<Query> shouldQueries = new ArrayList<>();
  //
  //    // Query cho title
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.multiMatch(
  //                    m ->
  //                        m.query(keyword)
  //                            .fields(List.of("title^2", "title.suggest^1.5", "title.trigram"))
  //                            .analyzer("vietnamese_analyzer")
  //                            .type(TextQueryType.BestFields))));
  //
  //    // Query cho ingredients.name
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.nested(
  //                    n ->
  //                        n.path("ingredients")
  //                            .query(
  //                                nq ->
  //                                    nq.multiMatch(
  //                                        m ->
  //                                            m.query(keyword)
  //                                                .fields(
  //                                                    List.of(
  //                                                        "ingredients.name^1.5",
  //                                                        "ingredients.name.suggest"))
  //                                                .analyzer("vietnamese_analyzer")
  //                                                .type(TextQueryType.BestFields))))));
  //
  //    // Query cho description
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.multiMatch(
  //                    m ->
  //                        m.query(keyword)
  //                            .fields(List.of("description", "description.suggest"))
  //                            .analyzer("vietnamese_analyzer")
  //                            .type(TextQueryType.BestFields))));
  //
  //    // Build final bool query, lọc các recipe chưa bị xóa
  //    Query finalQuery =
  //        Query.of(
  //            q ->
  //                q.bool(
  //                    b ->
  //                        b.should(shouldQueries)
  //                            .filter(Query.of(f -> f.term(t ->
  // t.field("isDeleted").value(false))))
  //                            .minimumShouldMatch("1")));
  //
  //    // Execute search
  //    return elasticsearchAsyncClient
  //        .search(
  //            s ->
  //                s.index("recipes")
  //                    .query(finalQuery)
  //                    .size(10) // Tăng size để có nhiều kết quả hơn
  //                    .source(
  //                        src ->
  //                            src.filter(
  //                                f ->
  //                                    f.includes(
  //                                        List.of("title", "ingredients.name", "description"))))
  //                    .highlight(
  //                        h ->
  //                            h.fields("title", f -> f)
  //                                .fields("title.suggest", f -> f)
  //                                .fields("ingredients.name", f -> f)
  //                                .fields("ingredients.name.suggest", f -> f)
  //                                .fields("description", f -> f)
  //                                .fields("description.suggest", f -> f)),
  //            RecipeDocument.class)
  //        .thenApply(
  //            response -> {
  //              log.debug("Natural search completed, hits: {}", response.hits().hits().size());
  //              return response.hits().hits().stream()
  //                  .filter(hit -> hit.source() != null)
  //                  .map(
  //                      hit -> {
  //                        RecipeDocument doc = hit.source();
  //                        doc.setHighlight(hit.highlight()); // Lưu highlight
  //                        return doc;
  //                      })
  //                  .collect(Collectors.toList());
  //            })
  //        .exceptionally(
  //            throwable -> {
  //              log.error("Natural search failed: {}", throwable.getMessage(), throwable);
  //              throw new AppException(ErrorCode.SEARCH_FAILED);
  //            });
  //  }
}
