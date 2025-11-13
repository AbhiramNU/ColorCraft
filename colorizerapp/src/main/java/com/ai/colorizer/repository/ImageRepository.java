package com.ai.colorizer.repository;

import com.ai.colorizer.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    // Additional query methods if needed
}
    