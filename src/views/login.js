function userList(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML= ""
    users.forEach(element => {

        const userDiv = document.createElement("div");
        userDiv.classList.add("card");

        const email = document.createElement("input");
        email.textContent = `email:${element.email}`

        const password = document.createElement("input");
        password.textContent = `password:${element.password}`

        const repeatPassword = document.createElement("input");
        repeatPassword.textContent = `repeat password:${element.repeatPassword}`

        const loginButton = document.createElement("button");
        loginButton.textContent = "login";        
        

        
        userDiv.appendChild(email);
        userDiv.appendChild(password);
        userDiv.appendChild(repeatPassword);
        userDiv.appendChild(loginButton);    
        userList.appendChild(userDiv);
    })
  
}

getUsers()

