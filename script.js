// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCUxwVkAcSfiwpRLsXlvSO03lvPAsfXaDg",
  authDomain: "nyan-login-and-signup.firebaseapp.com",
  projectId: "nyan-login-and-signup",
  storageBucket: "nyan-login-and-signup.appspot.com",
  messagingSenderId: "733262246218",
  appId: "1:733262246218:web:17c90c986664198bb311b3",
  measurementId: "G-7EQ61WYK18"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Redirect logged-in users
auth.onAuthStateChanged((user) => {
  if (user) {
    if (window.location.pathname.endsWith("index.html")) {
      window.location.href = "account.html";
    } else if (window.location.pathname.endsWith("account.html")) {
      document.getElementById("userInfo").textContent = `Logged in as: ${user.email}`;
    }
    devLog(`User logged in: ${user.email}`);
  } else {
    if (window.location.pathname.endsWith("account.html")) {
      window.location.href = "index.html";
    }
    devLog("No user logged in.");
  }
});

// ✅ Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const username = document.getElementById("signupUsername").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user.updateProfile({
          displayName: username
        });
      })
      .then(() => {
        alert("Account created!");
        devLog(`New account created: ${username} (${email})`);
      })
      .catch((err) => {
        alert(err.message);
        devLog(`Signup error: ${err.message}`);
      });
  });
}

// ✅ Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // 🔑 Dev-only check
    if (password === "nyan") {
      devLog("Correct dev password entered (nyan).");
      console.log("🐱 Dev mode unlocked!");
    }

    auth.signInWithEmailAndPassword(email, password)
      .catch((err) => {
        alert(err.message);
        devLog(`Login error: ${err.message}`);
      });
  });
}

// ✅ Forgot Password
const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
 
