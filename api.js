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
  
}