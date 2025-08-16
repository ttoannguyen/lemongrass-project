package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "ratings")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ManyToOne
  @JoinColumn(name = "recipe_id", nullable = false)
  private Recipe recipe;

  @ManyToOne
  @JoinColumn(name = "account_id", nullable = false)
  private Account account;

  @Column(nullable = false)
  private Double rating; // 0–10 scale

  @Column(name = "created_date", nullable = false)
  private Date createdDate;

  @Column(name = "last_modified_date")
  private Date lastModifiedDate;

  @PrePersist
  protected void onCreate() {
    createdDate = new Date();
    lastModifiedDate = new Date();
  }

  @PreUpdate
  protected void onUpdate() {
    lastModifiedDate = new Date();
  }
}
