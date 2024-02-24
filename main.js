"use strict";

import { getComments } from "./api.js";
import { postComments } from "./api.js";
import { dateForGetRequest } from "./converDate.js";
import { render } from "./render.js";
import { edit } from "./interaction.js";
import { like } from "./interaction.js";
import { answering } from "./interaction.js";

import { renderLoginPage } from "./login.js";


  const commentsList = document.getElementById("comments");
  const addButton = document.getElementById("add-button");
  const nameInput = document.getElementById("add-form-name");
  const textInput = document.getElementById("add-form-text");

  let commentsArray = [
  ];
  
  let isLoading = true;
 
  renderLoginPage()


  const apiRequestGet = () => {
   getComments().then((responseData)=>{
      console.log(responseData)

      commentsArray = responseData.comments.map((comment)=>{
          return {
            name: comment.author.name,
            date: dateForGetRequest(comment.date),
            text: comment.text,
            likes: comment.likes,
            isLike: false,
            isEdit: false
          }
      })
    
      isLoading = false;
      renderCommentsList()
    })
  }

  // apiRequestGet()


  function likeAdd() {
    const likesButton = document.querySelectorAll(".like-button");
    for (const likeButton of likesButton) {
      likeButton.addEventListener("click",(event)=>{
        const index = likeButton.dataset.index;
        event.stopPropagation();
        like(commentsArray, index)
        renderCommentsList();
      })
    }

  }
  likeAdd()




  export function renderCommentsList() {
    if (isLoading) {
        document.getElementById("comments").innerHTML =
          "Пожалуйста подождите, загружаю комментарии...";
        return;
      }
        render (commentsArray, commentsList)
        likeAdd()
        commentsAnswer();
        edit(commentsArray);
        autorization()
        
  };
  renderCommentsList()

//   let isAuto = false;

// function autorization() {
//   const authButton = document.querySelector(".auth")
//   addButton.addEventListener("click",()=>{
//     console.log("www")
//     isAuto=!isAuto
//     renderCommentsList()
//   })
// }


const adding=()=>{

  addButton.addEventListener('click', (event)=>{
    event.stopPropagation();
if (nameInput.value=== "" || textInput.value=== ""){
          console.log("а ну ка пиши коммент")
          return
}
  textInput.disabled = true;
  nameInput.disabled = true;
  addButton.textContent = "Комментарий добавялется..."

commentsArray.push({
  name: nameInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
  date: dateForGetRequest(),
  text: textInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
  likes: 0,
  isLike: false,
  isEdit: false

})

 function apiRequestPost() {
  const nameInput = document.getElementById("add-form-name");
  const textInput = document.getElementById("add-form-text");

  postComments(textInput.value, nameInput.value)
  .then((response)=>{
  if(response.status===201){
    apiRequestGet()

    textInput.disabled = false;
    nameInput.disabled = false;
    addButton.textContent = "Написать"
    nameInput.value="";
    textInput.value=""
  }
  else if (response.status===400){
    throw new Error("Имя и комментарий должны быть не короче 3 символов")
  }
  else if (response.status===500){
    throw new Error("Сервер сломался, попробуй позже")
  }
  else if(response.status===404){
    throw new Error("Нет авторизации")
  }
  else{
    throw new Error ("Упал интренет")
  }
  }) .catch((error)=>{
    
    textInput.disabled = false;
    nameInput.disabled = false;
    addButton.textContent = "Написать";

    if(error.message==="Сервер сломался, попробуй позже"){
      alert("Сервер сломался, попробуй позже")
    }
    else if(error.message==="Имя и комментарий должны быть не короче 3 символов"){
      alert("Имя и комментарий должны быть не короче 3 символов")
    }
    else if(error.message==="Нет авторизации"){
      alert("Нет авторизации")
    }
    else{
      alert("Упал интрернет")
    }
    
 }
)}

apiRequestPost()

})
}
 
  adding()
  renderCommentsList()


  
  document.addEventListener("keydown",(e)=>{
        if (e.key==="Enter") {
          adding()
        }
      })

     



   function commentsAnswer(){
   
    const comments = document.querySelectorAll(".comment");
        comments.forEach((commentElement,index) => {
          commentElement.addEventListener("click",(event)=>{
            event.stopPropagation();
            answering(commentsArray,index)
           })
        });
   }   
    