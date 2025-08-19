package com.ttoannguyen.lemongrass.entity;

import java.util.ArrayList;
import java.util.List;
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

  @Column(columnDefinition = "TEXT")
  String description;

  Integer cookingTime;

  @Enumerated(EnumType.STRING)
  Difficulty difficulty;

  Integer servings;

  @Column(name = "rating_avg")
  Double ratingAvg;

  Integer likeCount;

  @Column(name = "rating_count")
  Integer ratingCount;

  @Column(nullable = false)
  boolean isVerified;

  @Column(nullable = false)
  @Builder.Default
  Boolean isDeleted = false;

  @Column(nullable = false)
  Integer shareCount;

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Instruction> instructions = new ArrayList<>();

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Ingredient> ingredients = new ArrayList<>();

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Image> images = new ArrayList<>();

  @ManyToMany
  @JoinTable(
      name = "recipe_categories",
      joinColumns = @JoinColumn(name = "recipe_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id"))
  private List<Category> categories = new ArrayList<>();
}
