export function render ({commentsArray, commentsList}) {
  const appRendering = document.getElementById("app")

// let isAuto = false
// const addFormHtml = document.querySelector(".container")
//   const formHtml=`<div class="add-form">
//       <input
//         type="text"
//         id="add-form-name"
//         class="add-form-name"
//         placeholder="Введите ваше имя"
//       />
//       <textarea
//         type="textarea"
//         id="add-form-text"
//         class="add-form-text"
//         placeholder="Введите ваш коментарий"
//         rows="4"
//       ></textarea>
//       <div class="add-form-row">
//         <button id="add-button" class="add-form-button">Написать</button>
//       </div>
//     </div>`


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
  

      const appHtml =` <h1>Страница входа</h1>
      <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
          <input type="text" id="login-input" class="input" placeholder="Логин" />
          <input
            type="text"
            id="password-input"
            class="input"
            placeholder="Пароль"
          />
        </div>
        <br />
        <button class="button" id="login-button">Войти</button>
       
      </div> 
      ${commentsHTML}`
      appRendering.innerHTML = appHtml;
      
     
      const addButton = document.getElementById("add-button");

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

      // addFormHtml.innerHTML = 
      //   `
      //   <ul id="comments" class="comments">
      //   ${commentsHTML}
      //   </ul>
      //   ${isAuto ? formHtml : "Чтобы добавить комментарий, нужно авторизоваться"}
      //   <button class="auth">Авторизоваться</button>
      //   `


  
}