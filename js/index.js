// DOM
var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userEmail");
var userPasswordInput = document.getElementById("userPassword");
var loginBtn = document.getElementById("loginBtn");
var signBtn = document.getElementById("signBtn");
var logoutBtn = document.getElementById("logoutBtn");
var greetingName = document.querySelector("h1");
var fillingMsg = document.querySelector(".fillingMsg");
var repeatMsg = document.querySelector(".repeatMsg");
var validMsg = document.querySelector(".validMsg");
var incorrectMsg = document.querySelector(".incorrectMsg");
var successMsg = document.querySelector(".successMsg");

// Container of Data
var box = [];
var user;

// Store of Date
if (localStorage.getItem("key") != null) {
  box = JSON.parse(localStorage.getItem("key"));
}

// Function for Clearaing the Inputs
function clearInputs() {
  userNameInput.value = null;
  userEmailInput.value = null;
  userPasswordInput.value = null;
}

// Sign Up Page
signBtn.addEventListener("click", function () {
  if (repeatData()) {
    repeatMsg.classList.remove("d-none");
    correctMsg.classList.add("d-none");
    fillingMsg.classList.add("d-none");
  } else if (vaildSignUp()) {
    var userData = {
      userName: userNameInput.value,
      userEmail: userEmailInput.value,
      userPassword: userPasswordInput.value,
    };
    box.push(userData);
    localStorage.setItem("key", JSON.stringify(box));
    repeatMsg.classList.add("d-none");
    validMsg.classList.add("d-none");
    successMsg.classList.remove("d-none");
    window.location.href = "index.html";
  }

  clearInputs();
});

// Validaton on Sign Up
function vaildSignUp() {
  var reg1 = /^\w{3,}$/;
  var reg2 =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var reg3 = /^[0-9]{3,10}$/;

  if (
    userNameInput.value == "" ||
    userEmailInput.value == "" ||
    userPasswordInput.value == ""
  ) {
    fillingMsg.classList.remove("d-none");
    validMsg.classList.add("d-none");
    repeatMsg.classList.add("d-none");
    successMsg.classList.add("d-none");
    return false;
  } else if (
    reg1.test(userNameInput.value) == false &&
    reg2.test(userEmailInput.value) == false &&
    reg3.test(userPasswordInput.value) == false
  ) {
    validMsg.classList.remove("d-none");
    fillingMsg.classList.add("d-none");
    repeatMsg.classList.add("d-none");
    successMsg.classList.add("d-none");

    return false;
  } else if (
    reg1.test(userNameInput.value) &&
    reg2.test(userEmailInput.value) &&
    reg3.test(userPasswordInput.value)
  ) {
    validMsg.classList.add("d-none");
    fillingMsg.classList.add("d-none");
    repeatMsg.classList.add("d-none");
    // successMsg.classList.remove("d-none");

    return true;
  }
}

// Repeated Data in Sign Up
function repeatData() {
  for (var i = 0; i < box.length; i++) {
    if (
      box[i].userName == userNameInput.value &&
      box[i].userEmail == userEmailInput.value &&
      box[i].userPassword == userPasswordInput.value
    ) {
      return true;
    }
  }
}

// Login Page
loginBtn.addEventListener("click", function () {
  if (validLogin()) {
    if (loginCheckData()) {
      incorrectMsg.classList.add("d-none");
      fillingMsg.classList.add("d-none");
      window.location.href = "greeting.html";
    } else {
      correctMsg.classList.remove("d-none");
    }
  }
  clearInputs();
});

function loginCheckData() {
  for (var i = 0; i < box.length; i++) {
    if (
      box[i].userEmail == userEmailInput.value &&
      box[i].userPassword == userPasswordInput.value
    ) {
      user = box[i].userName;
      localStorage.setItem("name", user);
      return true;
    }
  }
  return false;
}

// Validaton on Sign In
function validLogin() {
  var reg1 =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var reg2 = /^[0-9]{3,10}$/;

  if (userEmailInput.value == "" || userPasswordInput.value == "") {
    fillingMsg.classList.remove("d-none");
    incorrectMsg.classList.add("d-none");
    return false;
  } else if (
    reg1.test(userEmailInput.value) == false ||
    reg2.test(userPasswordInput.value) == false
  ) {
    incorrectMsg.classList.remove("d-none");
    fillingMsg.classList.add("d-none");
    return false;
  } else {
    incorrectMsg.classList.remove("d-none");
    fillingMsg.classList.add("d-none");
    return true;
  }
}

// Greeting Page
if (window.location.href.includes("greeting.html")) {
  var storedName = localStorage.getItem("name");

  if (storedName) {
    greetingName.innerHTML = `Welcome ${storedName}`;
  }
}
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("name");
  window.location.href = "index.html";
});
