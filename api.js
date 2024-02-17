export function getComments() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/:ivanova_Kate/comments',{
          method:"GET"
        }
      ).then((response)=>{
        return response.json()
      })
}

export function postComments(){
  const nameInput = document.getElementById("add-form-name");
  const textInput = document.getElementById("add-form-text");
  return fetch(
    'https://wedev-api.sky.pro/api/v1/:ivanova_Kate/comments',{
      method:"POST",
      body: JSON.stringify({
        text: textInput.value,
        name: nameInput.value,
        // forceError: true
      })
    }
  ) 
}