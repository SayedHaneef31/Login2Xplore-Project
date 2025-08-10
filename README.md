# Student Enrollment Form

This is a simple but powerful **student enrollment form** built with **HTML**, **Bootstrap**, and **plain JavaScript**. It connects to **JsonPowerDB** to let you add, view, and update student records in real-time.

The cool part is how it **automatically checks** if a student's **Roll Number** already exists. If it's a new student, you can save their info. If they're already in the system, the form fills itself out, and you can update their details on the spot.

---

## ✨ Features
- **Smart Form**: Automatically detects whether to **Save** a new student or **Update** an existing one.
- **Real-time Validation**: Checks for a Roll Number in the database instantly.
- **Data Persistence**: Saves student info directly to **JsonPowerDB**.
- **Simple UI**: Clean, no-fuss interface that's easy to use.

---

## 💡 Why JsonPowerDB?
I chose **JsonPowerDB** because it's **fast and simple**.  
It's a **schema-free** database, meaning there’s no need to set up complex tables beforehand.  
It allows direct interaction with the database from JavaScript code, making small projects quick and easy to build.

---

## 📖 How to Use

### 1. Adding a New Student:
1. Type a new Roll Number and click away.
2. The form will unlock — fill out the remaining details.
3. Hit **Save**.

### 2. Updating a Student:
1. Type an existing Roll Number and click away.
2. The form will instantly load that student's data.
3. Make changes and hit **Update**.

---

## 📌 Project Info
- **Status**: Complete and working  
- **Version**: 1.0.0  
- **Database**: JsonPowerDB  
- **UI**: Bootstrap
