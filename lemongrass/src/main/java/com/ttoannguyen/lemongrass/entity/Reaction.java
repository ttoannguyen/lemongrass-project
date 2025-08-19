package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "reaction")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reaction extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(nullable = false)
  String targetId;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  ReactionTargetType targetType;

  @ManyToOne
  @JoinColumn(name = "account_id", nullable = false)
  Account account;
}
