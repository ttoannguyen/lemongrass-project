package com.ttoannguyen.lemongrass.entity;

import com.ttoannguyen.lemongrass.entity.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Table(name = "recipe_report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeReport extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    Recipe recipe;

    @Column(nullable = false)
    String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ReportStatus status;
}
