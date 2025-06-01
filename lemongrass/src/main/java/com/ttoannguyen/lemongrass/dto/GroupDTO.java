package com.ttoannguyen.lemongrass.dto;

import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupDTO {
    String groupId;
    String name;
    String description;
    String ownerId;
    String category;
    Visibility visibility;
    String coverImageUrl;
    String rules;
    boolean requirePostApproval;

}

