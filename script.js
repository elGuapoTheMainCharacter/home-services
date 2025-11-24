//use event delegation to detect a click for navigation buttons
let clickListener=document.getElementById("bodyWrapper");
if(clickListener){
    clickListener.addEventListener('click',function(event){
        if(event.target.id==="toNailsBtn"){
            window.open("nails.html");
        }else if(event.target.id==="toPlumberBtn"){
            window.open("plumber.html");
        }else if(event.target.id==="toTutorBtn"){
            window.open("tutor.html");
        }else if(event.target.id==="toGrassBtn"){
            window.open("grass.html");
        }else if(event.target.id==="toMovingBtn"){
            window.open("moving.html");
        }else if(event.target.id==="toCarpenterBtn"){
            window.open("carpenter.html");
        }
    });
}
//go back button
let goBackBtn=document.getElementById("goBackBtn");
    if(goBackBtn){
        goBackBtn.addEventListener('click',function(){
            // window.location.href="index.html"; // Old code
            window.history.back();
    });
}

// NOTE: We will handle the homeLogInBtn click using delegation below, so this block is removed.

//detect login activity
// Set a variable to store the login status
let isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

//if not logged in,take them to log in page
//before contacting a worker
document.addEventListener('click', function(event) {

        if (event.target.classList.contains("contactWorker")) {
        
        if (!isLoggedIn) { // if not logged in
            window.location.href = "login.html"; // open login page
        } else if (isLoggedIn) {
            window.location.href="contactWorkerForm.html"; // view a form to be created
        }
    }
});

// Function to handle Sign Out logic
function signOut() {
    sessionStorage.setItem("isLoggedIn", false); // Set status to logged out
    isLoggedIn = false; // Update the local JS variable
    checkLoginStatus(); // Update the button text/visibility
    // Optional: Redirect to home page after sign out
    if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
         window.location.href = "index.html";
    }
}

// Function to check login status
function checkLoginStatus() {
  // This selects all elements with the class ".homeLogInBtn"
  const homeLogInBtns = document.querySelectorAll(".homeLogInBtn"); 
  
  homeLogInBtns.forEach(button => {//looping to find the button
    if (isLoggedIn) {
      button.innerText = "Sign Out"; // Change text to "Sign Out"
    } else {
      
      button.innerText = "Log In";
      button.style.display = "block"; 
    }
  });
}

// We constantly call the function on page load to track log in status
checkLoginStatus();


//listen to the Sign i  button

document.addEventListener('click', function(event) {
    if (event.target.classList.contains("homeLogInBtn")) {
        // Check what the current text of the button is
        if (isLoggedIn && event.target.innerText === "Sign Out") {
            signOut();
        } else if (!isLoggedIn && event.target.innerText === "Log In") {
            window.location.href = "login.html";
        }
    }
});

// actual log in functionality (used only on the login.html page)
let logInBtn = document.getElementById("signIn");
let usernameField = document.getElementById("usernameField");
let passwordField = document.getElementById("passwordField");
let username = "main";
let password = "main";

if (logInBtn) {
  logInBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if ((usernameField.value === username) && (passwordField.value === password)) {
      sessionStorage.setItem("isLoggedIn", true);
      isLoggedIn = true;
      window.history.back(); 
    } else {
      document.getElementById("logginMsg").innerText = "Incorrect details. Try Again";
    }
  });
                 }
              
