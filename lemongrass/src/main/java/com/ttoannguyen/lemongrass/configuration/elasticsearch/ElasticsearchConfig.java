package com.ttoannguyen.lemongrass.configuration.elasticsearch;

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.ElasticsearchTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfig {
  @Value("${elasticsearch.host}")
  private String host;

  @Value("${elasticsearch.port}")
  private int port;

  @Value("${elasticsearch.scheme}")
  private String scheme;

  @Bean
  public RestClient restClient() {
    return RestClient.builder(new HttpHost(host, port, scheme)).build();
  }

  // @Bean
  // public ElasticsearchTransport elasticsearchTransport(
  //     RestClient restClient, ObjectMapper objectMapper) {
  //   return new RestClientTransport(restClient, new JacksonJsonpMapper(objectMapper));
  // }

  @Bean
  public ElasticsearchClient elasticsearchClient(ElasticsearchTransport transport) {
    return new ElasticsearchClient(transport);
  }

  @Bean
  public ElasticsearchAsyncClient elasticsearchAsyncClient(ElasticsearchTransport transport) {
    return new ElasticsearchAsyncClient(transport);
  }
}
