// package com.ttoannguyen.lemongrass.entity;
//
// import jakarta.persistence.*;
// import jakarta.validation.constraints.NotBlank;
// import lombok.*;
// import lombok.experimental.FieldDefaults;
//
// @Entity
// @Table(name = "materials")
// @Getter
// @Setter
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// @FieldDefaults(level = AccessLevel.PRIVATE)
// public class Material extends AbstractAuditingEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @Column(name = "id", updatable = false, nullable = false)
//    String id;
//
//    @NotBlank
//    @Column(name = "name", nullable = false, unique = true)
//    String name;
//
//    @ManyToOne
//    @JoinColumn(name = "default_unit_id")
//    Unit defaultUnit;
//
//    @Column(name = "category")
//    String category;
// }
