package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.IngredientResponse;
import com.ttoannguyen.lemongrass.dto.Response.InstructionResponse;
import com.ttoannguyen.lemongrass.dto.Response.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Ingredient;
import com.ttoannguyen.lemongrass.entity.Instruction;
import com.ttoannguyen.lemongrass.entity.Recipe;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {IngredientMapper.class, InstructionMapper.class})
public interface RecipeMapper {
    RecipeResponse toRecipeResponse(Recipe recipe);
}
