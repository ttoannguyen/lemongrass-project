package com.ttoannguyen.lemongrass.configuration.elasticsearch;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.indices.CreateIndexRequest;
import co.elastic.clients.elasticsearch.indices.ExistsRequest;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ElasticsearchIndexInitializer {
  ElasticsearchClient elasticsearchClient;

  private static final List<String> INDEXES = Arrays.asList("recipes");

  @PostConstruct
  public void initIndex() throws IOException {
    for (String indexName : INDEXES) {
      ExistsRequest existsRequest = ExistsRequest.of(e -> e.index(indexName));
      boolean indexExists = elasticsearchClient.indices().exists(existsRequest).value();
      if (!indexExists) {
        String mappingFilePath = "elasticsearch/" + indexName + "_mapping.json";
        ClassPathResource resource = new ClassPathResource(mappingFilePath);
        try (InputStream inputStream = resource.getInputStream()) {
          CreateIndexRequest createIndexRequest =
              CreateIndexRequest.of(c -> c.index(indexName).withJson(inputStream));
          elasticsearchClient.indices().create(createIndexRequest);
          System.out.println("Created index: " + indexName);
        } catch (Exception e) {
          System.err.println("Failed to create index: " + indexName + ": " + e.getMessage());
          throw e;
        }
      } else {
        System.out.println("Index " + indexName + " already exists!");
      }
    }
  }
}
