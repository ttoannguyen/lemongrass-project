package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.ReportStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "account_report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountReport extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    Account reporter;

    @ManyToOne
    @JoinColumn(name = "target_user_id", nullable = false)
    Account targetAccount;

    @Column(nullable = false)
    String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ReportStatus status;
}
