package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Recipe extends AbstractAuditingEntity implements Serializable {

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
    boolean isVerified = false;

    @Column(nullable = false)
    Integer shareCount = 0;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Instruction> instructions = new ArrayList<>();

//    @NotBlank
//    @Column(columnDefinition = "TEXT", nullable = false)
//    String instructions;
//
//    @Positive
//    @Column(name = "cooking_time", nullable = false)
//    Integer cookingTime;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "difficulty", nullable = false)
//    Difficulty difficulty;
//
//    @Positive
//    @Column(name = "servings", nullable = false)
//    Integer servings;
//
//    @PositiveOrZero
//    @Column(name = "rating_avg")
//    Double ratingAvg;



    public enum Difficulty {
        EASY, MEDIUM, HARD
    }
}