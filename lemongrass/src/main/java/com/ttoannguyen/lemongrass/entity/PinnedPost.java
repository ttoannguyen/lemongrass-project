package com.ttoannguyen.lemongrass.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "pinned_post")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PinnedPost extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "groups_id", nullable = false)
    Group group;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    Post post;

    @Column(nullable = false)
    LocalDateTime pinnedAt = LocalDateTime.now();
}
