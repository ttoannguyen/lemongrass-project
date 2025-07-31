package com.ttoannguyen.lemongrass.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Entity
@Table(name = "ingredient")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ingredient extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(updatable = false, nullable = false)
  String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recipe_id", nullable = false)
  @JsonIgnore
  Recipe recipe;

  @ManyToOne(optional = false)
  @JoinColumn(name = "template_id")
  IngredientTemplate template;

  @ManyToOne(optional = false)
  @JoinColumn(name = "unit_id")
  IngredientUnit unit;

  @Column(nullable = true)
  String note; // "băm nhỏ", "rửa sạch"

  @Column(nullable = false)
  Float quantity;

  @Column(name = "order_index")
  Integer orderIndex;
}
