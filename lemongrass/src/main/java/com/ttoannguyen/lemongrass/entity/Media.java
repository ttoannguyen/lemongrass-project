package com.ttoannguyen.lemongrass.entity;


import com.ttoannguyen.lemongrass.entity.enums.MediaType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "reaction_type")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Media extends AbstractAuditingEntity implements Serializable {
    @Id
            @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false)
    Integer targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    MediaType targetType;

    @Column(nullable = false)
    String url;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    MediaType mediaType;
}
