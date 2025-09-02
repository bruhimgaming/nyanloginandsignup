// ==================== Firebase Config ====================
const firebaseConfig = {
  apiKey: "AIzaSyCUxwVkAcSfiwpRLsXlvSO03lvPAsfXaDg",
  authDomain: "nyan-login-and-signup.firebaseapp.com",
  projectId: "nyan-login-and-signup",
  storageBucket: "nyan-login-and-signup.firebasestorage.app",
  messagingSenderId: "733262246218",
  appId: "1:733262246218:web:17c90c986664198bb311b3",
  measurementId: "G-7EQ61WYK18"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ==================== Switch Between Login/Signup ====================
function showSignup() {
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("signupCard").style.display = "block";
}

function showLogin() {
  document.getElementById("signupCard").style.display = "none";
  document.getElementById("loginCard").style.display = "block";
}

// ==================== Email/Password Signup ====================
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const username = document.getElementById("signupUsername").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName: username });

    // Send verification email
    await userCredential.user.sendEmailVerification();
    alert("Signup successful! Please check your email to verify before logging in.");

    showLogin(); // Redirect to login form
  } catch (error) {
    alert(error.message);
  }
});

// ==================== Email/Password Login ====================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);

    if (userCredential.user.emailVerified) {
      window.location.href = "account.html";
    } else {
      alert("Please verify your email before logging in.");
      await auth.signOut();
    }
  } catch (error) {
    alert(error.message);
  }
});

// ==================== GitHub Login ====================
document.getElementById("githubLogin")?.addEventListener("click", async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      window.location.href = "account.html";
    }
  } catch (error) {
    alert(error.message);
  }
});

// ==================== Password Reset ====================
document.getElementById("forgotPassword")?.addEventListener("click", async () => {
  const email = prompt("Enter your email for password reset:");
  if (email) {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  }
});

// ==================== Account Page Handling ====================
auth.onAuthStateChanged((user) => {
  if (document.getElementById("userEmail")) {
    if (user && user.emailVerified) {
      document.getElementById("userEmail").innerText = user.email;
      document.getElementById("userName").innerText =
        user.displayName || "No username set";
    } else if (!user) {
      window.location.href = "index.html";
    } else if (!user.emailVerified) {
      alert("Please verify your email to access your account.");
      auth.signOut();
      window.location.href = "index.html";
    }
  }
});

// ==================== Logout ====================
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await auth.signOut();
  alert("Logged out!");
  window.location.href = "index.html";
});
