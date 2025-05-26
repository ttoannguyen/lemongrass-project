package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "group")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Group extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "group_id", updatable = false, nullable = false)
    String groupId;

    @NotBlank
    @Column(unique = true, nullable = false)
    String name;

    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    private String category;

    private String coverImageUrl;

    private String rules;

    @Column(nullable = false)
    private boolean requirePostApproval = false;

    @Column(nullable = false)
    private Integer memberCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "visibility", nullable = false)
    Visibility visibility;

    public enum Visibility {
        PUBLIC, PRIVATE
    }
}
