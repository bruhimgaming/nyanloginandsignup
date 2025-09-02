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

// =========================
// Dev Console + Backdoor
// =========================
function showConsole() {
  const consoleBox = document.getElementById("devConsole");
  const logs = document.getElementById("consoleLogs");
  const online = document.getElementById("onlineUsers");

  // Show console
  consoleBox.style.display = "block";

  // Log helper
  function logMessage(msg) {
    const entry = document.createElement("div");
    entry.textContent = `[LOG] ${msg}`;
    logs.appendChild(entry);
    console.log(msg); // also in browser console
  }

  // Example log
  logMessage("✅ Dev Console Activated with backdoor password");

  // Track online users with Firebase Realtime Database
  const userRef = firebase.database().ref("onlineUsers");

  // Add current user to online list
  const myRef = userRef.push();
  myRef.set({ active: true });

  // Remove when user leaves
  window.addEventListener("beforeunload", () => {
    myRef.remove();
  });

  // Count users online
  userRef.on("value", (snapshot) => {
    const count = snapshot.numChildren();
    online.textContent = `👥 Users Online: ${count}`;
    logMessage(`Users Online Updated: ${count}`);
  });
}

// =========================
// Password Backdoor
// =========================
document.addEventListener("submit", (e) => {
  const passwordInput = e.target.querySelector("input[type='password']");
  if (!passwordInput) return;

  if (passwordInput.value === "nyan") {
    e.preventDefault();

    alert("Welcome Dev! Opening Console…");
    showConsole();
  }
});

                        
