package com.ai.colorizer;

import com.ai.colorizer.dto.FeedbackDTO;
import com.ai.colorizer.model.Feedback;
import com.ai.colorizer.model.Image;
import com.ai.colorizer.repository.FeedbackRepository;
import com.ai.colorizer.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping
    public ResponseEntity<?> addFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Optional<Image> imageOpt = imageRepository.findById(feedbackDTO.getImageId());
        if (!imageOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Image not found.");
        }

        Image image = imageOpt.get();

        Feedback feedback = new Feedback();
        feedback.setImage(image);
        feedback.setCommenter(feedbackDTO.getCommenter());
        feedback.setComment(feedbackDTO.getComment());
        feedback.setRating(feedbackDTO.getRating());

        feedbackRepository.save(feedback);

        return ResponseEntity.ok("Feedback saved successfully.");
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<List<Feedback>> getFeedbacksForImage(@PathVariable Long imageId) {
        List<Feedback> feedbacks = feedbackRepository.findByImageId(imageId);
        return ResponseEntity.ok(feedbacks);
    }
}
