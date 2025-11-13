package com.ai.colorizer.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;

    private LocalDateTime timeOfAction;

    // getter and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public LocalDateTime getTimeOfAction() { return timeOfAction; }
    public void setTimeOfAction(LocalDateTime timeOfAction) { this.timeOfAction = timeOfAction; }
}
