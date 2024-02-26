// import { regUser } from "./api"


//  export function navToReg () {

// const appRendering = document.getElementById("app")
//   const nameRegInput =document.getElementById("name-reg-input")
//   const loginRegInput =document.getElementById("login-reg-input")
//   const passwordRegInput =document.getElementById("password-reg-input")

//   const regHtml = `<h1>Страница регистрации</h1>
//   <div class="form">
//     <h3 class="form-title">Форма регистрации</h3>
//     <div class="form-row">
//     <input type="text" id="name-reg-input" class="input" placeholder="Ваше имя" />
//     <input type="text" id="login-reg-input" class="input" placeholder="Придумайте логин" />
//       <input
//         type="text"
//         id="password-reg-input"
//         class="input"
//         placeholder="Придумайте пароль"
//       />
//     </div>
//     <br />
//   </div>
//   <button class="button-reg">Зарегестрироваться</button>
//   `
//   appRendering.innerHTML = regHtml

//   regUser ({
//     nameUser: nameRegInput.value,
//     login: loginRegInput.value,
//     passwor: passwordRegInput.value
//   })
//   .then((responseData)=>{
//     setToken(responseData.user.token)
//     })
//     .then(()=>{
//       renderLoginPage()
//     })
//  }

  
