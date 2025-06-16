package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.MediaType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "reaction_type")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Media extends AbstractAuditingEntity {
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
