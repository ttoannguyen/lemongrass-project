package com.ttoannguyen.lemongrass.entity;

import com.ttoannguyen.lemongrass.entity.enums.GroupRole;
import com.ttoannguyen.lemongrass.entity.enums.MembershipStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "group_members")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupMembership extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "membership_id", updatable = false, nullable = false)
    String membershipId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groups_id", nullable = false)
    Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GroupRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    MembershipStatus status;

    public enum Role {
        MEMBER, OWNER
    }

    public enum Status {
        PENDING, APPROVED, BLOCKED
    }
}
