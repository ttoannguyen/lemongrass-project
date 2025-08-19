package com.ttoannguyen.lemongrass.dto.Response.embeded;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EmbeddedResponse {
  List<Float> embedding;
}
