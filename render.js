export function render (commentsArray, commentsList) {
  const appRendering = document.getElementById("app")
  let isAuto = false;


const addFormHtml = document.querySelector(".container")

  const formHtml=`<div class="add-form">
      <input
        type="text"
        id="add-form-name"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea
        type="textarea"
        id="add-form-text"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>`



    const commentsHTML = commentsArray.map((comment,index)=>{
        return `<li class="comment">${commentsHTML}
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
        <a href="index.html" id="link-to-tasks">Перейти на страницу задач</a>
      </div> `
      appRendering.innerHTML = appHtml;
      
      
      // addFormHtml.innerHTML = 
      //   `
      //   <ul id="comments" class="comments">
      //   ${commentsHTML}
      //   </ul>
      //   ${isAuto ? formHtml : "Чтобы добавить комментарий, нужно авторизоваться"}
      //   <button class="auth">Авторизоваться</button>
      //   `




  
}