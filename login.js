import { loginUser, setToken, token } from "./api.js"
import { commentsArray, renderCommentsList } from "./main.js"
// import { navToReg } from "./reg.js"

export function renderLoginPage() {
    const appRendering = document.getElementById("app")
    const loginHtml = `<h1>Страница входа</h1>
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
    </div>
    <div>
    <button class="button-reg">Зарегестрироваться</button>
    </div>
    `
    appRendering.innerHTML = loginHtml

    const buttonGet = document.getElementById("login-button");
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");

        buttonGet.addEventListener("click",()=>{
            loginUser({
                login:loginInput.value,
                password:passwordInput.value
            })
            .then((responseData)=>{
            console.log(responseData)
            setToken(responseData.user.token)
            console.log(token)
            })
            .then(()=>{
              renderCommentsList(commentsArray)
            })
        })


        function navToReg() {
          const regHtml = `<h1>Страница регистрации</h1>
          <div class="form">
            <h3 class="form-title">Форма регистрации</h3>
            <div class="form-row">
            <input type="text" id="name-reg-input" class="input" placeholder="Ваше имя" />
            <input type="text" id="login-reg-input" class="input" placeholder="Придумайте логин" />
              <input
                type="text"
                id="password-reg-input"
                class="input"
                placeholder="Придумайте пароль"
              />
            </div>
            <br />
          </div>
          <button class="button-reg">Зарегестрироваться</button>
          `
          appRendering.innerHTML = regHtml
        
          const nameRegInput =document.getElementById("name-reg-input")
          const loginRegInput =document.getElementById("login-reg-input")
          const passwordRegInput =document.getElementById("password-reg-input")

          regUser ({
            login: loginRegInput.value,
            name: nameRegInput.value,
            passwor: passwordRegInput.value
          })
        
         }


         const regNewButton = document.querySelector(".button-reg")
         regNewButton.addEventListener("click",()=>{
           navToReg ()
         })
 

}




    


