package com.ttoannguyen.lemongrass.dto.Response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ttoannguyen.lemongrass.entity.Recipe;
import jakarta.persistence.*;

public class InstructionResponse {
    String id;
    private Integer stepNumber;
    private String description;
}
