const API = "http://localhost:5000/api/matcha";

// 🔒 Protect page
const token = localStorage.getItem("token");

if(!token){
window.location = "login.html";
}

// ⭐ rating value
let ratingValue = 0;

// ⭐ Set rating
function setRating(value){

ratingValue = value;

let stars = document.querySelectorAll("#starContainer span");

stars.forEach((s,i)=>{
s.classList.toggle("active", i < value);
});

}

// 🖼 Preview image
function previewImage(){

let file = document.getElementById("image").files[0];

if(!file) return;

let preview = document.getElementById("preview");

preview.src = URL.createObjectURL(file);
preview.style.display = "block";
}

// ➕ Add Matcha
async function addMatcha(){

let name = document.getElementById("name").value;
let brand = document.getElementById("brand").value;
let notes = document.getElementById("notes").value;
let image = document.getElementById("image").files[0];

if(!name || !brand || ratingValue === 0){
alert("Fill required fields");
return;
}

let form = new FormData();

form.append("name", name);
form.append("brand", brand);
form.append("rating", ratingValue);
form.append("notes", notes);
form.append("image", image);

try{

await fetch(API,{
method:"POST",
headers:{
Authorization: token
},
body:form
});

clearForm();
loadMatcha();

}catch(err){
console.log(err);
alert("Error adding matcha");
}

}

// 🔄 Load Matcha
async function loadMatcha(){

try{

let res = await fetch(API,{
headers:{
Authorization: token
}
});

let data = await res.json();

let container = document.getElementById("matchaList");
container.innerHTML = "";

data.forEach(m => {

container.innerHTML += `
<div class="matchaCard">

<h3>${m.name}</h3>

<p><strong>${m.brand}</strong></p>

<p>${"⭐".repeat(m.rating)}</p>

<p>${m.notes}</p>

<img src="http://localhost:5000/uploads/${m.image}">

<button class="deleteBtn" onclick="deleteMatcha('${m._id}')">Delete</button>

</div>
`;

});

}catch(err){
console.log(err);
}

}

// ❌ Delete Matcha
async function deleteMatcha(id){

await fetch(API + "/" + id,{
method:"DELETE",
headers:{
Authorization: token
}
});

loadMatcha();
}

// 🔍 Search
function searchMatcha(){

let query = document.getElementById("search").value.toLowerCase();

let cards = document.querySelectorAll(".matchaCard");

cards.forEach(card=>{
card.style.display = card.innerText.toLowerCase().includes(query) ? "block" : "none";
});

}

// 🚪 Logout
function logout(){

localStorage.removeItem("token");
window.location = "login.html";

}

// 🧹 Clear Form
function clearForm(){

document.getElementById("name").value = "";
document.getElementById("brand").value = "";
document.getElementById("notes").value = "";
document.getElementById("image").value = "";

let preview = document.getElementById("preview");
preview.style.display = "none";

ratingValue = 0;

let stars = document.querySelectorAll("#starContainer span");
stars.forEach(s => s.classList.remove("active"));

}

// 🚀 Load on start
loadMatcha();