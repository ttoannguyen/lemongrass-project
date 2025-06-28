package com.ttoannguyen.lemongrass.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "instruction")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Instruction extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recipe_id", nullable = false)
  @JsonIgnore
  Recipe recipe;

  @Column(nullable = false)
  private Integer stepNumber;

  @Column(nullable = false)
  private String description;

  @OneToMany(mappedBy = "instruction", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Image> images = new ArrayList<>();
}
