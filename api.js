
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

export function postComments(textInput, nameInput){
  
  return fetch(
    'https://wedev-api.sky.pro/api/v2/ivanova-kit/comments',{
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: textInput,
        name: nameInput,
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
  }).then((response) => {
    return response.json();
  })

}