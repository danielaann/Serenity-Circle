# Serenity Circle   
*A Mental Health and Well-being Support Platform*

## Overview

**Serenity Circle** is a full-stack mental health platform designed to offer both self-help tools and professional support. The platform empowers users to take control of their mental well-being through journaling, mood tracking, relaxation tools, productivity support, and therapist connectivity. Designed with privacy, accessibility, and ease of use in mind, Serenity Circle is tailored for individuals who may hesitate to seek in-person help due to confidentiality concerns or accessibility issues.

---

## ✨ Key Features

### 🧠 Self-Help Tools
- **Mood Tracking**: Daily mood and emotion entries with trend analysis
- **Journaling**: Free-form and guided journal sessions with date-wise logs
- **Productivity Tracker**: Customizable daily goals and task lists with streak tracking
- **Relaxation Tools**: Guided breathing exercises and calming soundscapes

### 🩺 Professional Support
- **Therapist Onboarding**: Therapists register 
- **User-Therapist Chat**: Secure messaging between users and verified therapists
- **Appointments**: Future-dated session booking and cancellation features
- **Therapist Profiles**: View therapist qualifications and availability

### 🔐 User & Therapist Dashboard
- Personalized dashboard based on user type (regular user or therapist)
- Profile management and session logout
- Secure registration and login flows

---

## 🚦 Validation & Logic Rules

- Journals and tasks cannot be empty; task names must be unique per day
- Mood entries only allowed for current or past dates
- Appointments must be scheduled at least 1 hour ahead of current time
- All users and therapists can view session history, logout, and manage profiles

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)
- **Image Storage**: **Cloudinary** for secure image uploads (profile pictures)
- **Authentication**: JWT-based login system  
- **APIs**: RESTful architecture with custom validation  
- **Others**: Context API for state management, Form validations using custom hooks

---

## 📁 Project Structure (MERN Stack)

## 🧪 Future Enhancements

- 🤖 **AI-powered Journal Sentiment Analysis**: Analyze user journal entries to detect emotional tone and trends over time.
- 🎙️ **Voice-based Journaling**: Allow users to record and save audio journal entries using speech-to-text integration.
- 🌐 **Community-Based Support Groups**: Create safe, moderated groups for users to share experiences and advice anonymously.
- 🔔 **Push Notifications**: Remind users about daily tasks, journal entries, and upcoming therapist appointments.
- ⭐ **Therapist Rating and Review System**: Let users leave feedback for therapists after sessions to improve service quality and accountability.

