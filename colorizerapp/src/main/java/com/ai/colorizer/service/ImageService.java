package com.ai.colorizer.service;

import com.ai.colorizer.model.Image;
import com.ai.colorizer.repository.ImageRepository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    // Saves image metadata to the database
    public Image saveImageMetadata(String filename) {
        Image image = new Image();
        image.setFilename(filename);
        image.setTimeOfAction(LocalDateTime.now()); // Set current timestamp
        return imageRepository.save(image);
    }
}
