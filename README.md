# Overview

This project came about in an attempt to learn how to integrate a cloud database with a react native app. I decided to use Google's Firebase platform and create a Cloud Firestore database. I also decided to experiment with the authentication capabilities available with Firebase.

This is an app to make and keep goals. There are 4 different types of goals:

1. Count Goal- count the number of minutes/hours/pages that you spend on a certain goal.
2. Progress Goal - Set a goal to reach a certain number of minutes/hours/pages
3. Streak Goal - Set a daily goal and earn a streak
4. Frequency Goal - Set a goal to do something daily/times per week/times per month.

When you open up the app, you will be required to create an account and login. The app will store the login and allow you to create goals, check-in with those goals, and view progress.
The goal and check-in data is stored by user, so if you log out and log in with a different user, you will only see your data.

Setting goals is my passion in life and I wanted a way to track progress a little differently than other habit apps I have used.

[Software Demo Video](https://youtu.be/BLAxD_y0eMI)

# Cloud Database

I am using Firestore, which is a NoSQL database. It stores the data in collections and documents. Part of it's capabilities are real-time synchronization, cloud-based storage, no rigid table structure, offline support, and scalability.

My database is very simple with only 2 collections - Goals and CheckIns. Goals have a specific id, and CheckIns are added by goalId and check-in date. The goalId is on both tables for easier querying capability, which seems to be the practice in Firestore vs a SQL database.

One additional capability is that Authentication is enabled, so a user can be created with email/password security. This userId is saved on the Goals and CheckIns so that they can only be available per user.

# Development Environment

I used VS Code, Firestore, Firebase, Expo, react Native, and Expo Go as tools to build my project.

I used TypeScript as the language.
These libraries were used:
React
Expo Router
Firebase SDK
Async Storage
react-native-dropdown-picker
@react-native-community/datetimepicker
@react-native-vector-icons/ionicons

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [Firebase Setup in React Native Expo](https://www.youtube.com/watch?v=H-vG4G8eKNE&t=204s)
- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Cloud Firestore Data Modeling](https://www.youtube.com/watch?v=lW7DWV2jST0)
- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth/web/password-auth)
- [Firebase Authentication v9 in ReactJS](https://www.youtube.com/watch?v=MsDjbWUn3IE)

# Future Work

- Add Google Authentication
- Add Settings Page
- Add Profile Page
- Add error handling
- Add the ability to edit the goals
- Make the display better
- Add more options for value besides hours/minutes/pages
- Add plural/single words to descriptions
- Work out start/end dates for the goals and progress a little better
