package com.ttoannguyen.lemongrass.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Recipe extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "account_id")
  Account account;

  @Column(nullable = false, unique = true)
  String title;

  Integer cookingTime;

  @Enumerated(EnumType.STRING)
  Difficulty difficulty;

  Integer servings;

  Float ratingAvg;

  //  String category;

  @ManyToMany
  @JoinTable(
      name = "recipe_tag",
      joinColumns = @JoinColumn(name = "recipe_id"),
      inverseJoinColumns = @JoinColumn(name = "tag_name"))
  Set<Tag> tags = new HashSet<>();

  @Column(nullable = false)
  boolean isVerified;

  @Column(nullable = false)
  Integer shareCount;

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Instruction> instructions;

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Ingredient> ingredients;

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Image> images;

  @ManyToMany
  @JoinTable(
      name = "recipe_categories",
      joinColumns = @JoinColumn(name = "recipe_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id"))
  private List<Category> categories;
}
