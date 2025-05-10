
let myLoginForm = document.getElementById("my-login-form");

myLoginForm.addEventListener(`submit` , function(event){
    event.preventDefault();


    //using destructuring 

    const {
        userLoginEmail : {value  : userEmail },
        userLoginPassword : {value  : userPassword },
    } = event.target;

    // const email = event.target.userLoginEmail.value;
    // const password = event.target.userLoginPassword.value;

    let users = JSON.parse(localStorage.getItem(`users`)) || [];

   const storedUser = users.find((user) => user.userEmail === userEmail && user.userPassword === userPassword )

   if(storedUser){

    const {usrName :  fullName , userEmail  } = storedUser;
      const currentUser = { fullName, userEmail };

    // const currentUser = {
    //     fullName : storedUser.userName,
    //     userEmail : storedUser.userEmail,
    // }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert("User logged in successfully!");
    event.target.reset();
    window.location.href = "./html/home.html";
   }
   else{
    alert("enter a valid password or email !");
   }
})


// let signUp = document.getElementById("sign-up");

// signUp.style.cursor = "pointer";