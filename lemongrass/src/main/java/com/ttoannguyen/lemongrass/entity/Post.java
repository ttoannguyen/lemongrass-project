package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "post")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    String id;

    @Column(unique = true, nullable = false)
    String title;

    @Column(unique = true, nullable = false)
    String content;

    @Column(nullable = false)
    String visibility;

    @Column(nullable = false)
    boolean isApproved = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    Account account;

    @ManyToOne
    @JoinColumn(name = "group_id")
    Group group;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    Recipe recipe;
}
