"use strict";

import { getComments, token } from "./api.js";
import { postComments } from "./api.js";
import { dateForGetRequest } from "./converDate.js";
import { render } from "./render.js";
import { edit } from "./interaction.js";
import { like } from "./interaction.js";
import { answering } from "./interaction.js";
import { renderLoginPage } from "./login.js";
// import { format } from "date-fns"

  const commentsList = document.getElementById("comments");


   export let commentsArray = [
  ];
  
  let isLoading = true;
 
  // renderLoginPage()


  export const apiRequestGet = () => {
   getComments().then((responseData)=>{
      console.log(responseData)

      commentsArray = responseData.comments.map((comment)=>{
          return {
            name: comment.author.name,
            date: 1,
            text: comment.text,
            likes: comment.likes,
            isLike: false,
            isEdit: false
          }
      })
    
      isLoading = false;
      renderCommentsList(commentsArray)
    })
  }

  apiRequestGet()






  export function renderCommentsList(commentsArray) {
    if (isLoading) {
        document.getElementById("app").innerHTML =
          "Пожалуйста подождите, загружаю комментарии...";
        return;
      }
        render ({commentsArray: commentsArray, commentsList})
        likeAdd()
        commentsAnswer();
        edit(commentsArray);
        
  };



  
  document.addEventListener("keydown",(e)=>{
        if (e.key==="Enter") {
          adding()
        }
      })

     


      function likeAdd() {
     
        const likesButton = document.querySelectorAll(".like-button");
        for (const likeButton of likesButton) {
          likeButton.addEventListener("click",(event)=>{
            if(!token) {
              alert("Нужно авторизоваться")
              return
            }
            const index = likeButton.dataset.index;
            event.stopPropagation();
            like(commentsArray, index)
            renderCommentsList(commentsArray);
          })
        }
    
      }
  

   function commentsAnswer(){
   
    const comments = document.querySelectorAll(".comment");
        comments.forEach((commentElement,index) => {
          commentElement.addEventListener("click",(event)=>{
            event.stopPropagation();
            answering(commentsArray,index)
           })
        });
   }   
    