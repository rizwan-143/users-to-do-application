
let registrationForm = document.getElementById("my-registration-form");

registrationForm.addEventListener(`submit` , function(event){
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
   
  // Destructure input values from form elements using their name attributes
  const {
    userRegistrationName: { value: userName },
    userRegistrationEmail: { value: userEmail },
    userRegistrationPassword: { value: userPassword }
  } = event.target;


   // ✅ Check for empty fields
   // ! this will return false and alert condition will be true:
  if (!userName || !userEmail || !userPassword) {
    alert("Please fill out all fields!");
    return;
  }


  // checking if email is already exists
  let existEmail = users.find(user => user.userEmail === userEmail);
  if(existEmail){
    alert("this email is already exists !");
    return;
  }

  if (userPassword.length < 8){
    alert("please enter a string password !");
  }

  const usersObj = { userName, userEmail, userPassword };

    // const usersObj = {

        
    //     // userName : event.target.userRegistrationName.value,
    //     // userEmail : event.target.userRegistrationEmail.value,
    //     // userPassword : event.target.userRegistrationPassword.value,
    // };
    users.push(usersObj);
localStorage.setItem(`users` , JSON.stringify(users));
event.target.reset();
    

})

let login = document.getElementById("log-in");
login.style.cursor = "pointer";
login.addEventListener("click" , function(){
    window.location.href = "../index.html";
})