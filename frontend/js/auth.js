const API = "http://localhost:5000/api/auth";

// REGISTER
async function register(){

let username = document.getElementById("username").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(!username || !email || !password){
alert("Fill all fields");
return;
}

try{

let res = await fetch(API+"/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({username,email,password})
});

let data = await res.json();

alert("Registered successfully!");
window.location = "login.html";

}catch(err){
console.log(err);
alert("Error registering");
}

}


// LOGIN
async function login(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

try{

let res = await fetch(API+"/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
});

let data = await res.json();

if(data.token){
localStorage.setItem("token",data.token);
window.location = "index.html";
}else{
alert(data.message || "Login failed");
}

}catch(err){
console.log(err);
alert("Error logging in");
}

}