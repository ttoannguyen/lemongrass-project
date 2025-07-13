// package com.ttoannguyen.lemongrass.search;
//
// import lombok.RequiredArgsConstructor;
// import org.elasticsearch.search.suggest.SuggestBuilder;
// import org.elasticsearch.search.suggest.SuggestBuilders;
// import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
// import org.springframework.data.elasticsearch.core.suggest.response.Suggest;
// import org.springframework.data.elasticsearch.core.suggest.response.Suggest.Suggestion;
//// import org.springframework.data.elasticsearch.core.query.SuggestBuilderBuilder;
// import org.springframework.stereotype.Service;
//
// import java.util.List;
// import java.util.stream.Collectors;
//
// @Service
// @RequiredArgsConstructor
// public class SearchService {
//
//  private final ElasticsearchOperations elasticsearchOperations;
//
//  public List<String> autocompleteTitle(String query) {
//    var suggestionBuilder =
//        new SuggestBuilder()
//            .addSuggestion(
//                "title-suggest",
//                SuggestBuilders.completionSuggestion("titleSuggest")
//                    .prefix(query)
//                    .skipDuplicates(true)
//                    .size(10));
//
//    var suggestQuery = new SuggestBuilderBuilder(suggestionBuilder);
//
//    Suggest suggest = elasticsearchOperations.suggest(suggestQuery, FeedDocument.class);
//
//    Suggestion suggestion = suggest.getSuggestion("title-suggest");
//
//    return suggestion.getEntries().stream()
//        .flatMap(entry -> entry.getOptions().stream())
//        .map(option -> option.getText().string())
//        .collect(Collectors.toList());
//  }
// }
