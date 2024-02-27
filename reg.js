import { regUser, token } from "./api.js"



 export function regNewUser () {
    if(token) return
    const appRendering = document.getElementById("app")

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
  console.log(nameRegInput)
  const loginRegInput =document.getElementById("login-reg-input")
  console.log(loginRegInput)
  const passwordRegInput =document.getElementById("password-reg-input")

    regUser ({
        nameUser: nameRegInput.value,
        login: loginRegInput.value,
        passwor: passwordRegInput.value
    }) .then((responseData)=>{
        console.log(responseData)
    })

     
 }

  