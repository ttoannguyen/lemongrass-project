package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.Priority;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "notification")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  //    @ManyToOne
  //    @JoinColumn(name = "account_id", nullable = false)
  //    Account account;

  @ManyToOne
  @JoinColumn(name = "account_id", nullable = false)
  Account receiver;

  @ManyToOne
  @JoinColumn(name = "sender_id")
  Account sender;

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
  boolean isRead;

  @Enumerated(EnumType.STRING)
  Priority priority;
}
