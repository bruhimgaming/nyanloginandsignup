// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ====== UI toggle ======
function showSignup() {
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("signupCard").style.display = "block";
}

function showLogin() {
  document.getElementById("signupCard").style.display = "none";
  document.getElementById("loginCard").style.display = "block";
}

// ====== Email/Password Signup ======
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    alert("Signup successful! Please check your email for verification.");
    showLogin();
  } catch (error) {
    alert("Signup error: " + error.message);
  }
});

// ====== Email/Password Login ======
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Login successful!");
    window.location.href = "account.html";
  } catch (error) {
    alert("Login error: " + error.message);
  }
});

// ====== GitHub Login ======
document.getElementById("githubLogin")?.addEventListener("click", async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    alert("Logged in with GitHub: " + (user.displayName || user.email));
    window.location.href = "account.html";
  } catch (error) {
    alert("GitHub login error: " + error.message);
  }
});

// ====== Password Reset ======
document.getElementById("forgotPassword")?.addEventListener("click", async () => {
  const email = prompt("Enter your email to reset password:");
  if (!email) return;
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset email sent to " + email);
  } catch (error) {
    alert("Error: " + error.message);
  }
});
