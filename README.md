# ColorCraft

A full-stack image colorization system: Seamlessly upload, process, and manage images with modular, scalable technologies.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Drag-and-drop or file upload** for original images
- **AI-powered image colorization** using deep learning models
- **View original & colorized images** seamlessly
- **Metadata management** for all uploads (filename, timestamps)
- **Scalable, modular architecture**—backend, database, and colorization run independently

---

## Tech Stack
- **Frontend:** React
    - Component-based UI, asynchronous API interactions
- **Backend API:** Java Spring Boot
    - Handles file uploads, REST API, security, metadata persistence
- **Database:** MySQL
    - Stores metadata: filename, timestamps, etc.
- **Image Processor:** Python Flask + OpenCV
    - Exposes REST API, runs AI model for colorization

---

## Architecture
<img></img>

**Work flow:**
1. User uploads image on frontend
2. Spring Boot receives, saves metadata, forwards image to Flask service
3. Flask processes, returns colorized image
4. Spring Boot sends colorized image back to frontend
5. All upload/processing steps recorded in metadata

---

## Getting Started

### 1. Clone the Repository
git clone https://github.com/AbhiramNU/ColorCraft.git
