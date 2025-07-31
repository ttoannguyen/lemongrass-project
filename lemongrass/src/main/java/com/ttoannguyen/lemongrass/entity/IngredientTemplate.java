package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ingredient_template")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientTemplate extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(updatable = false, nullable = false)
  String id;

  @Column(nullable = false, unique = true)
  String name;

  @ElementCollection
  @CollectionTable(
      name = "ingredient_template_alias",
      joinColumns = @JoinColumn(name = "template_id"))
  @Column(name = "alias")
  List<String> aliases;

  @ManyToMany
  @JoinTable(
      name = "ingredient_template_allowed_unit",
      joinColumns = @JoinColumn(name = "template_id"),
      inverseJoinColumns = @JoinColumn(name = "unit_id"))
  @NotEmpty(message = "Đơn vị không được để trống!")
  Set<IngredientUnit> allowedUnits;
}
