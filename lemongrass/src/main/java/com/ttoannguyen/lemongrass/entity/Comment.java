package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import com.ttoannguyen.lemongrass.entity.enums.CommentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "comment")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Comment extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    Post post;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    Comment parentComment;

    @Column(nullable = false)
    String content;

    @Column(nullable = false)
    CommentStatus status;
}
