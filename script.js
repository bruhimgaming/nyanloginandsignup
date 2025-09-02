// =======================
// Firebase Auth Setup
// =======================

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// =======================
// Login Form
// =======================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Logged in!");
  } catch (error) {
    alert(error.message);
  }
});

// =======================
// Signup Form
// =======================
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const username = document.getElementById("signupUsername").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({
      displayName: username
    });
    alert("Signed up!");
  } catch (error) {
    alert(error.message);
  }
});

// =======================
// Forgot Password
// =======================
document.getElementById("forgotPassword").addEventListener("click", async () => {
  const email = prompt("Enter your email to reset password:");
  if (email) {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  }
});

// =======================
// GitHub Login
// =======================
document.getElementById("githubLogin").addEventListener("click", async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    alert("Logged in with GitHub!");
  } catch (error) {
    alert(error.message);
  }
});

// =======================
// Show/Hide Forms
// =======================
function showSignup() {
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("signupCard").style.display = "block";
}

function showLogin() {
  document.getElementById("signupCard").style.display = "none";
  document.getElementById("loginCard").style.display = "block";
}
