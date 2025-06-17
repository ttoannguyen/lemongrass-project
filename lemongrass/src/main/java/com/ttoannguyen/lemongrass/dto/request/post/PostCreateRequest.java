package com.ttoannguyen.lemongrass.dto.Request.post;

import com.ttoannguyen.lemongrass.entity.Account;
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
