"use strict";

import { getComments } from "./api.js";
import { postComments } from "./api.js";
import { dateForGetRequest } from "./converDate.js";
import { render } from "./render.js";


  const commentsList = document.getElementById("comments");
  const addButton = document.getElementById("add-button");
  const loader = document.querySelector(".loader");
  const nameInput = document.getElementById("add-form-name");
  const textInput = document.getElementById("add-form-text");

  let commentsArray = [
  ];
  

  const converDate = (date) =>{
    dateForGetRequest(date)
  }


  let isLoading = true;


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
      // loader.style.display ="none"
    
      isLoading = false;
      renderCommentsList()
    })
  }

  apiRequestGet()


  function likeAdd() {
    const likesButton = document.querySelectorAll(".like-button");
    for (const likeButton of likesButton) {
      likeButton.addEventListener("click",()=>{
        const index = likeButton.dataset.index;
        if (commentsArray[index].isLike) {
          commentsArray[index].likes--;
          commentsArray[index].isLike = false;
         
        } else {
          commentsArray[index].likes++;
          commentsArray[index].isLike = true;
          
        }
        renderCommentsList();
      })
    }

  }
  likeAdd()


  function renderCommentsList() {
    if (isLoading) {
        document.getElementById("comments").innerHTML =
          "Пожалуйста подождите, загружаю комментарии...";
        return;
      }
      render (commentsArray, commentsList)
        likeAdd()
        commentsAnswer();
        editComments();
        
  };
  renderCommentsList()


  function adding() {
    addButton.addEventListener('click', (event)=>{
    event.stopPropagation();
if (nameInput.value=== "" || textInput.value=== ""){
          console.log("а ну ка пиши коммент")
          return
}
  textInput.disabled = true;
  nameInput.disabled = true;
 addButton.textContent = "Комментарий добавялется..."

 
  const converDate = (date) =>{
  dateForGetRequest(date)
}


    commentsArray.push({
      name: nameInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
      date: dateForGetRequest(),
      text: textInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
      likes: 0,
      isLike: false,
      isEdit: false

    })

     function apiRequestPost() {
      postComments()
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

  function commentsAnswer(){
    const formInputText = document.querySelector(".add-form-text");
    const formName = document.querySelector(".add-form-name");
    const comments = document.querySelectorAll(".comment");
        comments.forEach((commentElement,index) => {
          commentElement.addEventListener("click",()=>{
          formInputText.value = `>${commentsArray[index].text} \n${commentsArray[index].name},`;
          
           })
        });
   }   
    
  
  document.addEventListener("keydown",(e)=>{
        if (e.key==="Enter") {
           
          event.stopPropagation();
          if (nameInput.value=== "" || textInput.value=== ""){
                    console.log("а ну ка пиши коммент")
                    return
          }
            textInput.disabled = true;
            nameInput.disabled = true;
           addButton.textContent = "Комментарий добавялется..."
          

          const converDate = (date) =>{
            dateForGetRequest(date)
          }
          
              commentsArray.push({
                name: nameInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
                date: dateForGetRequest(),
                text: textInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
                likes: 0,
                isLike: false,
                isEdit: false
          
              })
          
               function apiRequestPost() {
                postComments()
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
                })
              
                  .catch((error)=>{
                  
                  textInput.disabled = false;
                  nameInput.disabled = false;
                  addButton.textContent = "Написать";
          
                  if(error.message==="Сервер сломался, попробуй позже"){
                    alert("Сервер сломался, попробуй позже")
                  }
                  else if(error.message==="Имя и комментарий должны быть не короче 3 символов"){
                    alert("Имя и комментарий должны быть не короче 3 символов")
                  }
                  else if(error.message==="Упал интернет"){
                    alert("Упал интрернет")
                  }
               }
              )}
          
            apiRequestPost()

        
        }
      })



      function editComments(){
    const commentsBody = document.querySelector(".comment-body");
    const editedComment = document.querySelectorAll('.comment-edited-text')
    const editButtons = document.querySelectorAll(".editButton");

        editButtons.forEach((editButton,index) => {
            editButton.addEventListener("click",(event)=>{
                event.stopPropagation();
               commentsArray[index].isEdit = !commentsArray[index].isEdit;
               if(commentsArray.isEdit){
                  commentsArray.text = editedComment.value
               }
               renderCommentsList()

              })

        });
   }
