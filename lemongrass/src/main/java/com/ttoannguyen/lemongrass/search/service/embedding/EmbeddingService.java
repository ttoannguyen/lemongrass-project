package com.ttoannguyen.lemongrass.search.service.embedding;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttoannguyen.lemongrass.dto.Request.embeded.EmbedRequest;
import com.ttoannguyen.lemongrass.dto.Response.embeded.EmbeddedResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmbeddingService {
  WebClient webClient = WebClient.builder().baseUrl("http://localhost:8000").build();

  public float[] embedOne(String text) throws JsonProcessingException {
    EmbedRequest body = new EmbedRequest(text == null ? "" : text);
    log.info(body.toString());
    // log JSON trước khi gửi
    ObjectMapper mapper = new ObjectMapper();
    String json = mapper.writeValueAsString(body);
    System.out.println("➡️ Sending JSON: " + json);
    JsonNode resp =
        webClient
            .post()
            .uri("/embed")
            .header("Content-Type", "application/json; charset=UTF-8")
            .bodyValue(json)
            .retrieve()
            .bodyToMono(JsonNode.class)
            .block();

    JsonNode emb = resp.get("embedding");
    float[] out = new float[emb.size()];
    for (int i = 0; i < emb.size(); i++) out[i] = emb.get(i).floatValue();
    System.out.println(Arrays.toString(out));
    return out;
  }
}
