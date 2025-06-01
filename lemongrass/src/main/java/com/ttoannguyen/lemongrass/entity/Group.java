package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "groups")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Group extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "groups_id", updatable = false, nullable = false)
    String groupId;

    @NotBlank
    @Column(unique = true, nullable = false)
    String name;

    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

     String category;

     String coverImageUrl;

     String rules;

    @Column(nullable = false)
     boolean requirePostApproval = false;

    @Column(nullable = false)
     Integer memberCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "visibility", nullable = false)
    Visibility visibility;

    public enum Visibility {
        PUBLIC, PRIVATE
    }
}
