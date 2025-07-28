package com.ttoannguyen.lemongrass.search.service;

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.search.document.RecipeDocument;
import com.ttoannguyen.lemongrass.search.dto.SearchRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

  //  public CompletableFuture<List<RecipeDocument>> search(SearchRequest request) {
  //    log.debug("Starting search with request: {}", request);
  //
  //    // Validate request
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
  //    // Simplified query: only search on title
  //    shouldQueries.add(
  //        Query.of(q -> q.matchPhrasePrefix(m -> m.field("title").query(request.getKeyword()))));
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
  //        .search(s -> s.index("recipes").query(finalQuery), RecipeDocument.class)
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

  //  public CompletableFuture<List<RecipeDocument>> search(SearchRequest request) {
  //    log.debug("Starting search with request: {}", request);
  //
  //    // Validate request
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
  //    // Multi-match on text fields
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.multiMatch(
  //                    m ->
  //                        m.fields(List.of("title^2", "description", "accountName"))
  //                            .query(request.getKeyword())
  //                            .type(
  //                                co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType
  //                                    .BestFields))));
  //
  //    // Nested query for tags.name
  //    shouldQueries.add(
  //        Query.of(
  //            q ->
  //                q.nested(
  //                    n ->
  //                        n.path("tags")
  //                            .query(
  //                                nq ->
  //                                    nq.match(
  //                                        m ->
  // m.field("tags.name").query(request.getKeyword()))))));
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
  //                                                .query(request.getKeyword()))))));
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
  //                                                .query(request.getKeyword()))))));
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
  //                                              .map(
  //                                                  v ->
  //                                                      co.elastic.clients.elasticsearch._types
  //                                                          .FieldValue.of(v))
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
  //        .search(s -> s.index("recipes").query(finalQuery), RecipeDocument.class)
  //        .thenApply(
  //            response -> {
  //              log.debug("Search completed, hits: {}", response.hits().hits().size());
  //              return response.hits().hits().stream()
  //                  .filter(hit -> hit.source() != null)
  //                  .map(hit -> hit.source())
  //                  .collect(Collectors.toList());
  //            })
  //        .exceptionally(
  //            throwable -> {
  //              log.error("Search failed: {}", throwable.getMessage(), throwable);
  //              throw new AppException(ErrorCode.SEARCH_FAILED);
  //            });
  //  }

  public CompletableFuture<List<RecipeDocument>> search(SearchRequest request) {
    log.debug("Starting search with request: {}", request);

    // Validate request
    if (request.getKeyword() == null || request.getKeyword().isEmpty()) {
      log.error("Search keyword is required");
      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
    }

    // Build query
    List<Query> shouldQueries = new ArrayList<>();
    List<Query> filterQueries = new ArrayList<>();

    // Always filter out deleted recipes
    filterQueries.add(Query.of(q -> q.term(t -> t.field("isDeleted").value(false))));

    // Query string for non-nested fields
    shouldQueries.add(
        Query.of(
            q ->
                q.queryString(
                    qs ->
                        qs.fields(List.of("title^2", "description", "accountName"))
                            .query(request.getKeyword())
                            .defaultOperator(
                                co.elastic.clients.elasticsearch._types.query_dsl.Operator.And)
                            .fuzziness("AUTO"))));

    // Nested query for tags.name
    shouldQueries.add(
        Query.of(
            q ->
                q.nested(
                    n ->
                        n.path("tags")
                            .query(
                                nq ->
                                    nq.match(
                                        m ->
                                            m.field("tags.name")
                                                .query(request.getKeyword())
                                                .operator(Operator.And)
                                                .fuzziness("AUTO"))))));

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
                                                .operator(Operator.And)
                                                .fuzziness("AUTO"))))));

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
                                                .operator(Operator.And)
                                                .fuzziness("AUTO"))))));

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
          Query.of(q -> q.term(t -> t.field("difficulty").value(request.getDifficulty()))));
    }

    // Build final bool query
    Query finalQuery =
        Query.of(
            q ->
                q.bool(b -> b.should(shouldQueries).filter(filterQueries).minimumShouldMatch("1")));

    // Log query for debugging
    log.debug("Executing Elasticsearch search query: {}", finalQuery.toString());

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

  //  public CompletableFuture<List<RecipeDocument>> search(SearchRequest request) {
  //    log.debug("Starting search with request: {}", request);
  //
  //    // Validate request
  //    if (request.getKeyword() == null || request.getKeyword().isEmpty()) {
  //      log.error("Search keyword is required");
  //      throw new AppException(ErrorCode.SEARCH_KEYWORD_REQUIRED);
  //    }
  //    String field = request.getField() != null ? request.getField() : "title";
  //    log.debug("Search field: {}", field);
  //
  //    // Build query
  //    List<Query> mustQueries = new ArrayList<>();
  //    List<Query> filterQueries = new ArrayList<>();
  //
  //    // Always filter out deleted recipes
  //    filterQueries.add(Query.of(q -> q.term(t -> t.field("isDeleted").value(false))));
  //
  //    // Add keyword search based on field
  //    switch (field) {
  //      case "title":
  //      case "description":
  //      case "accountName":
  //        mustQueries.add(
  //            Query.of(q -> q.matchPhrasePrefix(m ->
  // m.field(field).query(request.getKeyword()))));
  //        break;
  //      case "tags.name":
  //        mustQueries.add(
  //            Query.of(
  //                q ->
  //                    q.nested(
  //                        n ->
  //                            n.path("tags")
  //                                .query(
  //                                    nq ->
  //                                        nq.matchPhrasePrefix(
  //                                            m ->
  //                                                m.field("tags.name")
  //                                                    .query(request.getKeyword()))))));
  //        break;
  //      case "ingredients.name":
  //        mustQueries.add(
  //            Query.of(
  //                q ->
  //                    q.nested(
  //                        n ->
  //                            n.path("ingredients")
  //                                .query(
  //                                    nq ->
  //                                        nq.matchPhrasePrefix(
  //                                            m ->
  //                                                m.field("ingredients.name")
  //                                                    .query(request.getKeyword()))))));
  //        break;
  //      case "instructions.description":
  //        mustQueries.add(
  //            Query.of(
  //                q ->
  //                    q.nested(
  //                        n ->
  //                            n.path("instructions")
  //                                .query(
  //                                    nq ->
  //                                        nq.matchPhrasePrefix(
  //                                            m ->
  //                                                m.field("instructions.description")
  //                                                    .query(request.getKeyword()))))));
  //        break;
  //      default:
  //        log.error("Invalid search field: {}", field);
  //        throw new AppException(ErrorCode.INVALID_SEARCH_FIELD);
  //    }
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
  //    Query finalQuery = Query.of(q -> q.bool(b -> b.must(mustQueries).filter(filterQueries)));
  //
  //    // Execute search
  //    log.debug("Executing Elasticsearch search query");
  //    return elasticsearchAsyncClient
  //        .search(s -> s.index("recipes").query(finalQuery), RecipeDocument.class)
  //        .thenApply(
  //            response -> {
  //              log.debug("Search completed, hits: {}", response.hits().hits().size());
  //              return
  // response.hits().hits().stream().map(Hit::source).collect(Collectors.toList());
  //            })
  //        .exceptionally(
  //            throwable -> {
  //              log.error("Search failed: {}", throwable.getMessage(), throwable);
  //              throw new AppException(ErrorCode.SEARCH_FAILED);
  //            });
  //  }
}
