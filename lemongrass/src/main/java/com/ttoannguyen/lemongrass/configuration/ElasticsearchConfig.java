package com.ttoannguyen.lemongrass.configuration;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticConfig {

  @Bean
  public RestHighLevelClient elasticsearchClient() {
    return new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));
  }
}
