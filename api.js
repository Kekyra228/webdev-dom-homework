// export let token;
// export const SetToken=(newToken)=>{
// token=newToken
// }



export const token =
"asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"


export function getComments() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/:ivanova-kit/comments',{
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
    'https://wedev-api.sky.pro/api/v2/:ivanova-kit',{
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