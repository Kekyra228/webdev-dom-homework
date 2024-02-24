import { loginUser } from "./api.js"

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
    </div>`
    appRendering.innerHTML = loginHtml

    const buttonGet = document.getElementById("login-button");
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");

        buttonGet.addEventListener("click",()=>{
            loginUser({
                login:loginInput.value,
                password:passwordInput.value
            }).then((responseData)=>{
            console.log(responseData)
            })
        })
}