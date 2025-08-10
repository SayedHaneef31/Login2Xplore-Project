Student Enrollment Form
This is a simple but powerful student enrollment form built with HTML, Bootstrap, and plain JavaScript. It connects to JsonPowerDB to let you add, view, and update student records in real-time.

The cool part is how it automatically checks if a student's Roll Number already exists. If it's a new student, you can save their info. If they're already in the system, the form fills itself out, and you can update their details on the spot.

Features
Smart Form: The form knows whether to Save a new student or Update an existing one.

Real-time Validation: Checks for a Roll Number in the database the moment you click away.

Data Persistence: All student info is saved directly to JsonPowerDB.

Simple UI: A clean, no-fuss interface that's easy to use.

Why JsonPowerDB?
I chose JsonPowerDB because it's incredibly fast and simple. It's a schema-free database, which means I didn't have to worry about setting up complex tables beforehand. It lets you talk directly to the database from the JavaScript code, which makes building small projects like this much quicker.

How to Use
1. Adding a New Student:

Type a new Roll Number and click away.

The form will unlock. Fill out the rest of the details.

Hit Save.

2. Updating a Student:

Type an existing Roll Number and click away.

The form will instantly load that student's data.

Change what you need to and hit Update.

Project Info
Status: Complete and working.

Version: 1.0.0

Database: JsonPowerDB

UI: Bootstrap
