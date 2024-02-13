"use strict";

import { getComments } from "./api.js";

     

  const nameInput = document.getElementById("add-form-name");
  const textInput = document.getElementById("add-form-text");
  const commentsList = document.getElementById("comments");
  const addButton = document.getElementById("add-button");
  const loader = document.querySelector(".loader")

  let commentsArray = [
  ];
  

  const converDate = (date) =>{
    const currentDate = new Date(date);
  let dateNum = currentDate.getDate();
  if (dateNum < 10) { 
   dateNum = "0" + dateNum; 
  }
  let monthNum = currentDate.getMonth()+1;
  if (monthNum < 10) { 
   monthNum = "0" + monthNum; 
  }
  let yearNum = currentDate.getFullYear().toString().substring(2)
  let hour = currentDate.getHours();
  if (hour < 10) { 
   hour = "0" + hour; 
  }
  let minute = currentDate.getMinutes(); 
  if (minute < 10) { 
  minute = "0" + minute; 
    }
    return dateNum + "." + monthNum + "." + yearNum + " " + hour + ":" + minute 
  }


  let isLoading = true;


  const apiRequestGet = () => {
   getComments().then((responseData)=>{
      console.log(responseData)

      commentsArray = responseData.comments.map((comment)=>{
          return {
            name: comment.author.name,
            date: converDate(comment.date),
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
   const commentsHTML = commentsArray.map((comment,index)=>{
      return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
             ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter"  data-count=${comment.likes} >${comment.likes}</span>
              <button data-index=${index} class="like-button ${commentsArray[index].isLike ? "-active-like" : ""}" ></button>
              <button data-index=${index} class ="editButton"> ${commentsArray[index].isEdit? "Сохранить":"Редактировать"} </button>
            </div>
          </div>
        </li>`
    }).join("");

        commentsList.innerHTML = commentsHTML
        likeAdd()

        commentsAnswer();
        editComments();
        adding()
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

  const currentDate = new Date();
  let dateNum = currentDate.getDate();
  if (dateNum < 10) { 
   dateNum = "0" + dateNum; 
  }
  let monthNum = currentDate.getMonth()+1;
  if (monthNum < 10) { 
   monthNum = "0" + monthNum; 
  }
  let yearNum = currentDate.getFullYear().toString().substring(2)
  let hour = currentDate.getHours();
  if (hour < 10) { 
   hour = "0" + hour; 
  }
  let minute = currentDate.getMinutes(); 
  if (minute < 10) { 
  minute = "0" + minute; 
    }
    

    commentsArray.push({
      name: nameInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
      date: `${dateNum}.${monthNum}.${yearNum} ${hour}:${minute}`,
      text: textInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
      likes: 0,
      isLike: false,
      isEdit: false

    })

     function apiRequestPost() {
      const apiResult = fetch(
        'https://wedev-api.sky.pro/api/v1/:ivanova_Kate/comments',{
          method:"POST",
          body: JSON.stringify({
            text: textInput.value,
            name: nameInput.value,
            forceError: true
          })
        }
      )

      apiResult.then((response)=>{
      if(response.status===500){
        throw new Error("Сервер сломался, попробуй позже")
      }
      else if (response.status===400){
        throw new Error("Имя и комментарий должны быть не короче 3 символов")
      }
      else {
        throw new Error ("Упал интернет")
      }
      })
      .then(()=>{
      apiRequestGet()

          textInput.disabled = false;
          nameInput.disabled = false;
          addButton.textContent = "Написать"
          nameInput.value="";
          textInput.value=""
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

  })
  }
 

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
           
            if (nameInput.value=== "" || textInput.value=== ""){
                    console.log("error")
                    return
             }

            const currentDate = new Date();
            let dateNum = currentDate.getDate();
            if (dateNum < 10) { 
            dateNum = "0" + dateNum; 
            }
            let monthNum = currentDate.getMonth()+1;
            if (monthNum < 10) { 
            monthNum = "0" + monthNum; 
            }
            let yearNum = currentDate.getFullYear().toString().substring(2)
            let hour = currentDate.getHours();
            if (hour < 10) { 
            hour = "0" + hour; 
            }
            let minute = currentDate.getMinutes(); 
            if (minute < 10) { 
            minute = "0" + minute; 
              }
              

                commentsArray.push({
                name: nameInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
                date: `${dateNum}.${monthNum}.${yearNum} ${hour}:${minute}`,
                text: textInput.value.replaceAll('>','&gt').replaceAll('<','&lt;'),
                likes: 0,
                isLike: false,
                isEdit: false

              })
                
                renderCommentsList();
                editComments()
              
                nameInput.value="";
                textInput.value=""
        
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
сч