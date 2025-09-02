import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCUxwVkAcSfiwpRLsXlvSO03lvPAsfXaDg",
  authDomain: "nyan-login-and-signup.firebaseapp.com",
  projectId: "nyan-login-and-signup",
  storageBucket: "nyan-login-and-signup.appspot.com",
  messagingSenderId: "733262246218",
  appId: "1:733262246218:web:17c90c986664198bb311b3",
  measurementId: "G-7EQ61WYK18"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Redirect logged-in users
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (window.location.pathname.endsWith("index.html")) {
      window.location.href = "account.html";
    } else if (window.location.pathname.endsWith("account.html")) {
      document.getElementById("userInfo").textContent = `Logged in as: ${user.email}`;
    }
  } else {
    if (window.location.pathname.endsWith("account.html")) {
      window.location.href = "index.html";
    }
  }
});

// 🔹 Login / Signup

// Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const username = document.getElementById("signupUsername").value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      alert("Account created!");
    } catch (err) {
      alert(err.message);
    }
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  });
}

// Google login
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      alert(err.message);
    }
  });
}

// Forgot password
const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
  forgotPassword.addEventListener("click", async () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    }
  });
}

// 🔹 Account Page Buttons

// Logout
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

// Reset password
const resetPasswordBtn = document.getElementById("resetPassword");
if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", async () => {
    const email = auth.currentUser.email;
    await sendPasswordResetEmail(auth, email);
    alert("Reset password email sent!");
  });
}

// Verify email
const verifyBtn = document.getElementById("verifyEmail");
if (verifyBtn) {
  verifyBtn.addEventListener("click", async () => {
    if (!auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent! Check your inbox.");
    } else {
      alert("Your email is already verified.");
    }
  });
}

// Delete account
const deleteBtn = document.getElementById("deleteAccount");
if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(auth.currentUser);
        alert("Account deleted!");
        window.location.href = "index.html";
      } catch (err) {
        alert("Error deleting account: " + err.message);
      }
    }
  });
}

// 🔹 Card toggle animation
let loginCard = document.getElementById("loginCard");
let signupCard = document.getElementById("signupCard");

window.showSignup = () => {
  loginCard.classList.add("slide-left");
  loginCard.classList.remove("slide-right");
  signupCard.classList.remove("slide-right");
  signupCard.classList.remove("slide-left");
};

window.showLogin = () => {
  signupCard.classList.add("slide-right");
  signupCard.classList.remove("slide-left");
  loginCard.classList.remove("slide-left");
  loginCard.classList.remove("slide-right");
};

// Show signup card and hide login card
function showSignup() {
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("signupCard").style.display = "block";
}

// Show login card and hide signup card
function showLogin() {
  document.getElementById("signupCard").style.display = "none";
  document.getElementById("loginCard").style.display = "block";
}

// Optional: start with login visible and signup hidden
window.onload = () => {
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("signupCard").style.display = "none";
};
