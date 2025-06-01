package com.ttoannguyen.lemongrass.entity;

import com.ttoannguyen.lemongrass.entity.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "post_report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostReport extends AbstractAuditingEntity implements Serializable {
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
