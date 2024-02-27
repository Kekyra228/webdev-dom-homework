
export let token;
export const setToken = (newToken) => {
  token = newToken;
};



export function getComments() {
    return fetch(
        'https://wedev-api.sky.pro/api/v2/ivanova-kit/comments',{
          method:"GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response)=>{
        return response.json()
      })
}

export function postComments(textInput){
  
  return fetch(
    'https://wedev-api.sky.pro/api/v2/ivanova-kit/comments',{
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: textInput
        // forceError: true
      })
    }
  ) 
}

export function loginUser({ login, password }) {
  return fetch(" https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}

export function regUser( loginRegInput,nameRegInput,passwordRegInput) {
  return fetch(" https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login:loginRegInput,
      name:nameRegInput,
      password:passwordRegInput
    }),
  }) .then((response) => {
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      throw new Error("ошибка 400");
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((responseData) => {
    alert("Вы успешно зарегистрировались.");

  })
  .catch((error) => {
    if (error.message === "ошибка 400") {
      alert("Пользователь с такими данными уже есть, попробуйте снова");
    } else {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
  })

}