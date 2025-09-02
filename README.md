# Nyan Login & Signup System

![Nyan Logo](nyan.png)

Welcome to **Nyan Login**, a modern, fully functional **login/signup and account management system** built using **Firebase Authentication** and hosted on **GitHub Pages**.  

This project allows users to:

- Create an account with email/password  
- Login with email/password or Google  
- Manage their account: logout, reset password, verify email, delete account  

The system is **fully responsive**, **scrollable**, and **interactable**, with a sleek black theme and smooth card animations.

---

## Table of Contents

1. [Live Demo](#live-demo)  
2. [Features](#features)  
3. [Folder Structure](#folder-structure)  
4. [Setup & Installation](#setup--installation)  
5. [How It Works](#how-it-works)  
6. [Account Management](#account-management)  
7. [Embedding in Another Website](#embedding-in-another-website)  
8. [Customization](#customization)  
9. [Future Improvements](#future-improvements)  
10. [FAQ](#faq)  
11. [License](#license)  

---

## Live Demo

Check it out here:  
[https://bruhimgaming.github.io/nyanloginandsignup/](https://bruhimgaming.github.io/nyanloginandsignup/)

---

## Features

### ✅ Login & Signup

- Email/password signup and login  
- Google Login integration for faster access  
- Persistent login – users stay logged in until logout  
- Username support – displayed on the account page  

### ✅ Account Management

- Logout – ends the user session  
- Reset password – sends a password reset email  
- Verify email – sends verification link if not verified  
- Delete account – permanently deletes user account  

### ✅ Responsive Design

- Black theme with white text for high contrast  
- Polished card layout with smooth slide animations  
- Mobile-friendly and works on all screen sizes  

### ✅ Embed Option

- The login/signup page can be embedded via **iframe** on other sites  
- Fully interactable and scrollable  

---

## Folder Structure

nyan-login-site/
│
├─ index.html # Login / Signup page
├─ account.html # Account management page
├─ styles.css # Styling and animations
├─ script.js # Single JS file with Firebase logic
├─ nyan.png # Website logo / default profile picture
└─ README.md # Project documentation

yaml
Copy code

---

## Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/nyan-login-site.git
cd nyan-login-site
2️⃣ Firebase Configuration
1. Go to Firebase Console

2. Create a new project

3. Enable Authentication → Sign-in methods: Email/Password & Google

4. Copy the config into script.js:

js
Copy code
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
Save the file

3️⃣ Run Locally
Open index.html in your browser to test login/signup

Open account.html to test account features

4️⃣ Deployment
GitHub Pages:

Push the repository to GitHub

Go to Settings → Pages → Source → main branch / root

Visit https://<username>.github.io/<repo>/

Firebase Hosting (Optional):

Run firebase init

Choose Hosting, set public folder = ./`

Run firebase deploy

How It Works
Login / Signup: Form collects email, password, username, and sends to Firebase Authentication

Google Login: Sign-in handled by Firebase signInWithPopup

Account Page: Shows user info, allows email verification, password reset, logout, and deletion

Redirection: Users automatically redirected based on login state

Persistent Login: Users remain logged in until logout

Account Management Buttons
Button	Functionality
Logout	Ends session and redirects to login page
Reset Password	Sends reset password email to current user
Verify Email	Sends verification email if user not verified
Delete Account	Deletes current user from Firebase

Embedding in Another Website
You can embed the login/signup page in another website using an iframe:

html
Copy code
<iframe 
  src="https://bruhimgaming.github.io/nyanloginandsignup/" 
  width="100%" 
  height="700" 
  style="border:none; overflow:auto;" 
  title="Nyan Login">
</iframe>
Fully scrollable and interactable

Adjust height for your website layout

Works on Google Sites, HTML pages, or other web platforms

Customization
Logo: Replace nyan.png with your own logo

Colors & Fonts: Edit styles.css to change colors, fonts, or card styling

Firebase Config: Replace the config in script.js with your own Firebase project info

Animations: Update card animations in styles.css and JS

Username Display: Change displayName usage in JS for custom greetings

Future Improvements
Profile pictures (requires upgraded Firebase plan)

Dark/light mode toggle

Animated card transitions

Email verification reminders

Multi-language support

FAQ
Q1: Can I see users’ emails or passwords?
A1: No. Firebase Authentication keeps user data secure; passwords are hashed and not accessible.

Q2: Can I use this system on Google Sites?
A2: Yes! Embed the login page using an iframe as shown above.

Q3: Do I need a paid Firebase plan?
A3: No. Email/Password login and Google login work on the free plan. Profile pictures require storage, which needs a paid plan.

Q4: Can I add my own domain?
A4: Yes. Both GitHub Pages and Firebase Hosting support custom domains.

License
This project is open-source under the MIT License. See LICENSE file for details.

Made with ❤️ by Nyan Corp
