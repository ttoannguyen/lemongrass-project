package com.ttoannguyen.lemongrass.utils;

import co.elastic.clients.elasticsearch._types.query_dsl.MatchPhrasePrefixQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import java.util.function.Supplier;

public class ESUtil {

  public static Supplier<Query> createSupplierAutoSuggest(String partialProductName) {
    return () -> Query.of(
        q -> q.bool(
            b -> b.should(
                s -> s.matchPhrasePrefix(
                    createMatchPhrasePrefixQuery(partialProductName)))
                .should(s -> s.match(createMatchQuery(partialProductName)))
                .minimumShouldMatch("1")));
  }

  public static MatchPhrasePrefixQuery createMatchPhrasePrefixQuery(String partialProductName) {
    return new MatchPhrasePrefixQuery.Builder().field("title").query(partialProductName).build();
  }

  public static MatchQuery createMatchQuery(String partialProductName) {
    return new MatchQuery.Builder().field("title").query(partialProductName).build();
  }
}
