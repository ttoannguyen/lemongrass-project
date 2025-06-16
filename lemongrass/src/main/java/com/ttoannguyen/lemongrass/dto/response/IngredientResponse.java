package com.ttoannguyen.lemongrass.dto.Response;

import com.ttoannguyen.lemongrass.entity.Recipe;
import jakarta.persistence.*;

public class IngredientResponse {
    String id;
    String name;
    String quantity;
    Integer order;
}
