package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "ingredient")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ingredient  extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    String id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    Recipe recipe;

    @Column(nullable = false)
    String name;

    String quantity;

    String unit;

    Integer order;
//
//    @ManyToOne
//    @JoinColumn(name = "material_id", nullable = false)
//    Material material;
//
//    @PositiveOrZero
//    @Column(name = "quantity")
//    Double quantity;
//
//    @ManyToOne
//    @JoinColumn(name = "unit_id")
//    Unit unit;
//
//    @Column(name = "custom_unit")
//    String customUnit;
//
//    @Column(name = "notes")
//    String notes;
}
