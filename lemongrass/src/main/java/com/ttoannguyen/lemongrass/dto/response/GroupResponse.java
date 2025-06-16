package com.ttoannguyen.lemongrass.dto.Response;

import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupResponse {
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
