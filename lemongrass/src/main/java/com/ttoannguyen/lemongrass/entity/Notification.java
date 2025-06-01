package com.ttoannguyen.lemongrass.entity;


import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.Priority;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "notification")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationType type;

    @Column(nullable = false)
    String content;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;

    @ManyToOne
    @JoinColumn(name = "groups_id")
    Group group;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    Recipe recipe;

    @Column(nullable = false)
    boolean isRead = false;

    @Enumerated(EnumType.STRING)
    Priority priority;
}
