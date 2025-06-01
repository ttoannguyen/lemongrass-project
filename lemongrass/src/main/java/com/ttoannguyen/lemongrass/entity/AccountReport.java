package com.ttoannguyen.lemongrass.entity;

import com.ttoannguyen.lemongrass.entity.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "account_report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountReport extends AbstractAuditingEntity implements Serializable {
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
