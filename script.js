// =======================
// Firebase Config
// =======================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =======================
// Switch Between Login & Signup
// =======================
function showLogin() {
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("signupCard").style.display = "none";
}

function showSignup() {
  document.getElementById("signupCard").style.display = "block";
  document.getElementById("loginCard").style.display = "none";
}

showLogin(); // Default to login

// =======================
// Signup
// =======================
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const username = document.getElementById("signupUsername").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Set display name
    await user.updateProfile({ displayName: username });

    // Send verification email
    await user.sendEmailVerification();

    alert("Account created! Please check your inbox to verify your email.");
  } catch (error) {
    console.error("Signup error:", error);
    alert("Error: " + error.message);
  }
});

// =======================
// Login
// =======================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email before logging in.");
      await auth.signOut();
      return;
    }

    alert("Welcome back, " + (user.displayName || user.email));
  } catch (error) {
    console.error("Login error:", error);
    alert("Error: " + error.message);
  }
});

// =======================
// Forgot Password
// =======================
document.getElementById("forgotPassword").addEventListener("click", async () => {
  const email = prompt("Enter your email for password reset:");
  if (!email) return;

  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset email sent to " + email);
  } catch (error) {
    console.error("Password reset error:", error);
    alert("Error: " + error.message);
  }
});

// =======================
// Auth State Listener
// =======================
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged in:", user);
    // TODO: redirect to account.html or show profile info
  } else {
    console.log("Not logged in");
  }
});
