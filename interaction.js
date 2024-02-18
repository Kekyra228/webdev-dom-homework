export function edit(commentsArray,index) {
    commentsArray[index].isEdit = !commentsArray[index].isEdit;
    if(!commentsArray[index].isEdit){
       commentsArray[index].text = editedComment[index].value
    }
}

export function like(commentsArray, index){
    
    if (commentsArray[index].isLike) {
      commentsArray[index].likes--;
      commentsArray[index].isLike = false;
     
    } else {
      commentsArray[index].likes++;
      commentsArray[index].isLike = true;
      
    }
}

export function answering(commentsArray,index){
    const formInputText = document.querySelector(".add-form-text");
    formInputText.value = `>${commentsArray[index].text} \n${commentsArray[index].name},`;
}