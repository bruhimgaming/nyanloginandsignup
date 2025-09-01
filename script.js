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

import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// 🔹 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCUxwVkAcSfiwpRLsXlvSO03lvPAsfXaDg",
  authDomain: "nyan-login-and-signup.firebaseapp.com",
  projectId: "nyan-login-and-signup",
  storageBucket: "nyan-login-and-signup.appspot.com",
  messagingSenderId: "733262246218",
  appId: "1:733262246218:web:17c90c986664198bb311b3",
  measurementId: "G-7EQ61WYK18"
};

// 🔹 Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// ✅ Redirect logged-in users to account.html
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (window.location.pathname.endsWith("index.html")) {
      window.location.href = "account.html";
    } else if (window.location.pathname.endsWith("account.html")) {
      document.getElementById("userInfo").textContent = `Logged in as: ${user.email}`;
      if (user.photoURL) {
        document.getElementById("profilePic").src = user.photoURL;
      }
    }
  } else {
    if (window.location.pathname.endsWith("account.html")) {
      window.location.href = "index.html";
    }
  }
});

// ✅ Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch (err) {
      alert(err.message);
    }
  });
}

// ✅ Login
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

// ✅ Google login
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

// ✅ Forgot password
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

// ✅ Logout
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
  });
}

// ✅ Reset password
const resetPasswordBtn = document.getElementById("resetPassword");
if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", async () => {
    const email = auth.currentUser.email;
    await sendPasswordResetEmail(auth, email);
    alert("Reset email sent!");
  });
}

// ✅ Verify email
const verifyBtn = document.getElementById("verifyEmail");
if (verifyBtn) {
  verifyBtn.addEventListener("click", async () => {
    await sendEmailVerification(auth.currentUser);
    alert("Verification email sent!");
  });
}

// ✅ Delete account
const deleteBtn = document.getElementById("deleteAccount");
if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      await deleteUser(auth.currentUser);
    }
  });
}

