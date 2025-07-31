// package com.ttoannguyen.lemongrass.entity;
//
// import jakarta.persistence.*;
// import lombok.*;
// import lombok.experimental.FieldDefaults;
//
// import java.util.HashSet;
// import java.util.Set;
//
// @Entity
// @Table(name = "tags")
// @Getter
// @Setter
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// @FieldDefaults(level = AccessLevel.PRIVATE)
// public class Tag {
//
//  @Id
//  @Column(name = "name", unique = true, nullable = false)
//  String name;
//
//  String color;
//
//  @Builder.Default
//  @ManyToMany(mappedBy = "tags")
//  Set<Recipe> recipes = new HashSet<>();
// }
