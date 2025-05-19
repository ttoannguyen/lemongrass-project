package com.ttoannguyen.lemongrass.entity;

import java.io.Serializable;
import java.util.Set;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role extends AbstractAuditingEntity implements Serializable {
    @Id
    String name;

    String description;

    @ManyToMany
    Set<Permission> permissions;
}
