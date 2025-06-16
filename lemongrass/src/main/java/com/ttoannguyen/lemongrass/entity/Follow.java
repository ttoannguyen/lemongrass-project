package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.FollowTargetType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "follow")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Follow extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    Account follower;

    @Column(nullable = false)
    Integer targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    FollowTargetType targetType;
}
