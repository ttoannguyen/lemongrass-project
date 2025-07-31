package com.ttoannguyen.lemongrass.dto.Request.group;

import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupCreateRequest {
    String name;
    String description;
    String category;
    String coverImageUrl;
    String rules;
    boolean requirePostApproval;
    Integer memberCount;
    Visibility visibility;
}
