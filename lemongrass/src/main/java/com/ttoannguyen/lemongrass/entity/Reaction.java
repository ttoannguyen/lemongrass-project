package com.ttoannguyen.lemongrass.entity;

import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;

@Entity
@Table(name = "reaction")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reaction extends AbstractAuditingEntity implements Serializable {
    @Id
            @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false)
    Integer targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ReactionTargetType targetType;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @ManyToOne
    @JoinColumn(name = "reaction_type_id", nullable = false)
    ReactionType reactionType;
}
