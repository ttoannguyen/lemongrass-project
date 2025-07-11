package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {}
