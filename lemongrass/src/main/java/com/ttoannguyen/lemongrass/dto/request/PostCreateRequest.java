package com.ttoannguyen.lemongrass.dto.Request;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.Recipe;
import lombok.Data;

@Data
public class PostCreateRequest {

    String title;

    String content;

    String visibility;

//    boolean isApproved;

    Account account;

    String groupId; // optional

    String recipeId; // optional
}
