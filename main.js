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

  apiRequestGet()


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



 
  // adding()
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
    