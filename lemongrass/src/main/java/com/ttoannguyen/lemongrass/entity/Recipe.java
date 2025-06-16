package com.ttoannguyen.lemongrass.entity;

import java.util.List;
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

    @Column(nullable = false)
    String title;

    Integer cookingTime;

    @Enumerated(EnumType.STRING)
    Difficulty difficulty;

    Integer servings;

    Float ratingAvg;

    String category;

    @Column(columnDefinition = "JSON")
    String tags;

    @Column(nullable = false)
    boolean isVerified;

    @Column(nullable = false)
    Integer shareCount;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Instruction> instructions;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Ingredient> ingredients;

    public enum Difficulty {
        EASY,
        MEDIUM,
        HARD
    }
}
