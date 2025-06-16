package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.ReportStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "post_report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostReport extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    Post post;

    @Column(nullable = false)
    String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ReportStatus status;
}
