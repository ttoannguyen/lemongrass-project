package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "ingredient_unit")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientUnit {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(updatable = false, nullable = false)
  String id;

  @Column(nullable = false, unique = true)
  String name; // gram, ml, cái...

  @Column(nullable = false)
  Float minValue;

  @Column(nullable = false)
  Float stepSize;
}
