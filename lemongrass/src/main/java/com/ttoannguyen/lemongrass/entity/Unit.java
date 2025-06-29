// package com.ttoannguyen.lemongrass.entity;
//
// import jakarta.persistence.*;
// import jakarta.validation.constraints.NotBlank;
// import lombok.*;
// import lombok.experimental.FieldDefaults;
//
// @Entity
// @Table(name = "units")
// @Getter
// @Setter
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// @FieldDefaults(level = AccessLevel.PRIVATE)
// public class Unit extends AbstractAuditingEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @Column(name = "id", updatable = false, nullable = false)
//    String id;
//
//    @NotBlank
//    @Column(name = "name", nullable = false, unique = true)
//    String name;
//
//    @Column(name = "type")
//    String type;
// }
