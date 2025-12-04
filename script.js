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
            window.location.href="index.html"; // Old code
            //window.history.back();
    });
}


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
    isLoggedIn = false; // Update isLoggedIn variable
    checkLoginStatus(); // Update the button text/visibility
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
         if ((usernameField.value ==="") || (passwordField.value === "")){
            document.getElementById("logginMsg").innerText = "Please do not leave fields blank";
        
         } else if ((usernameField.value === username) && (passwordField.value === password)) {
          sessionStorage.setItem("isLoggedIn", true);
          isLoggedIn = true;
             //window.history.back();
             window.location.href = "index.html";
        } else {
          document.getElementById("logginMsg").innerText = "Incorrect details. Try Again";
        }
  });
}

//feedback after pessing the submit button for worker
let submitProblem = document.getElementById("submitProblem");
if(submitProblem){
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("fixerEmail");
    let phone = document.getElementById("fixerPhone");
    let reason = document.getElementById("reason");
    let brief = document.getElementById("brief");
    
    
    submitProblem.addEventListener('click',function(){
        if(firstName.value == "" || lastName.value == "" || email.value == "" || phone.value == "" || reason.value == "" || brief.value == ""){
            responseSent.innerHTML = "Fill All The Fields!!";
        }else{
            responseSent.innerHTML ="";
            alert("Request Successfully Sent");
            //after everything is filled,clear the form
            firstName.value = "";
            lastName.value = "";
            email.value = "";
            phone.value = "";
            reason.value = "";
            brief.value = "";
        }
    });
}
//do u offer homenservuce
let registerAJob=document.getElementById("registerAJob");
if(registerAJob){
    registerAJob.addEventListener('click',function(){
        if (!isLoggedIn) { // if not logged in
            window.location.href = "login.html"; // open login page
        } else if (isLoggedIn) {
            window.location.href="reigisterAService.html"; // view a form to be created
        }
    });
}
// Function to handle submitting a new service worker
let submitService = document.getElementById("submitService");
if (submitService) {
  submitService.addEventListener('click', function(event) {
    event.preventDefault();
    let firstName = document.getElementById("firstNameWorker").value;
    let category = document.getElementById("category").value;
    let experience = document.querySelector(".serviceExperience").value;
    let imageInput = document.getElementById("image");
    let imageFile = imageInput.files[0];

    if (!firstName || !category || !experience || !imageFile) {
      alert("Please fill in all fields.");
      return;
    }

    let reader = new FileReader();
    reader.onload = function() {
      let imageData = reader.result;
      const newWorker = {
        name: firstName,
        experience: experience + " Years",
        rating: "New",
        category: category,
        image: imageData
      };

      let workers = JSON.parse(sessionStorage.getItem('registeredWorkers')) || [];
      workers.push(newWorker);
      sessionStorage.setItem('registeredWorkers', JSON.stringify(workers));

      alert("Worker added successfully to session storage!");
      document.getElementById("firstNameWorker").value = "";
      document.getElementById("category").value = "";
      document.querySelector(".serviceExperience").value = "";
      imageInput.value = "";
    };
    reader.readAsDataURL(imageFile);
  });
}

// Function to dynamically add worker cards to the current page
function displayRegisteredWorkers() {
  const currentPageCategory = document.title;
  const servicesMenu = document.querySelectorAll(".servicesMenu .serviceRow");
  if (!servicesMenu) return;

  const workers = JSON.parse(sessionStorage.getItem('registeredWorkers')) || [];
  const relevantWorkers = workers.filter(worker => worker.category === currentPageCategory);

  relevantWorkers.forEach(worker => {
    const serviceCard = document.createElement('div');
    serviceCard.className = "seviceCard";
    serviceCard.innerHTML = `
      <img src="${worker.image}" height="400px" width="400px" alt="Service Picture" width="350px">
      <p class="serviceDescription">${worker.name}</p>
      <p>Experience: ${worker.experience}</p>
      <p>Rating: ${worker.rating}</p>
      <button class="contactWorker" data-worker-name="${worker.name}">Contact</button>
    `;
    servicesMenu[1].appendChild(serviceCard);
  });
}

// Call displayRegisteredWorkers when the page loads
//displayRegisteredWorkers();
// Call this function when any service page loads to display existing data
displayRegisteredWorkers();

// when navigqting back,chech cqche
window.addEventListener('pageshow', function (event) {
    // I check if the page was loaded from the browser cache
    if (event.persisted) {
        // If it was loaded from cache, run the display function again to update the list
        displayRegisteredWorkers();
        
        checkLoginStatus(); 
    }
});
                
