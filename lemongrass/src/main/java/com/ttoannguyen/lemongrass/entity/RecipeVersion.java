package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "recipe_version")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeVersion extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    Recipe recipe;

    String title;
    Integer cookingTime;

    @Enumerated(EnumType.STRING)
    Difficulty difficulty;

    Integer servings;

    String category;

    @Column(columnDefinition = "JSON")
    String tags;

    // @ManyToOne
    // @JoinColumn(name = "modified_by", nullable = false)
    // private Account modifiedBy;
}
