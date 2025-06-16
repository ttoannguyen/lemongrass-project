package com.ttoannguyen.lemongrass.dto.Response;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.Recipe;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    String id;
    String title;
    String content;
    String visibility;
    boolean isApproved;
    AccountResponse accountResponse;
    GroupResponse group;
    RecipeResponse recipe;
}
