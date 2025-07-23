package com.ttoannguyen.lemongrass.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ttoannguyen.lemongrass.entity.enums.CategoryType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(unique = true)
  private String name;

  @Enumerated(EnumType.STRING)
  private CategoryType type;

  @ManyToMany(mappedBy = "categories")
  @JsonIgnoreProperties("categories") // Ngăn serialize vòng lặp
  @Builder.Default
  List<Recipe> recipes = new ArrayList<>();
}
