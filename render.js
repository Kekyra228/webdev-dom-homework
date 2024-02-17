export function render (commentsArray, commentsList) {
    const commentsHTML = commentsArray.map((comment,index)=>{
        return `<li class="comment">
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
  
          commentsList.innerHTML = commentsHTML
}