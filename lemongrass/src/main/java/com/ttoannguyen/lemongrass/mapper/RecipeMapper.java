package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { AccountMapper.class, IngredientMapper.class, InstructionMapper.class })
public interface RecipeMapper {
    @Mapping(source = "account", target = "account")
    @Mapping(source = "ingredients", target = "ingredients")
    @Mapping(source = "instructions", target = "instructions")
    @Mapping(source = "verified", target = "isVerified")
    RecipeResponse toRecipeResponse(Recipe recipe);
}
