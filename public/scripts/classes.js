const editClassDiv = document.querySelector(".edit-class-div");
const startEditBtn = document.querySelectorAll(".start-edit-btn");
const addClassDiv = document.querySelector(".add-a-class-div");
const addClassFromEditBtn = document.querySelector(".add-class-from-edit-btn");
const activateDeleteBtn = document.querySelector(".activate-delete");
const deleteBtn = document.querySelectorAll(".delete-button");



activateDeleteBtn.addEventListener("click", () => {
    for(let i = 0; i < deleteBtn.length; i++){
        if(deleteBtn[i].style.display === "none"){
            deleteBtn[i].style.display = "block";
        } else {
            deleteBtn[i].style.display = "none";
        }
}})


for(let event of startEditBtn){
    event.addEventListener("click", () => {
        editClassDiv.style.display = "block";
        sessionStorage.setItem("editClassDivAppear", "true");
})}

addClassFromEditBtn.addEventListener("click", () => {
    sessionStorage.removeItem("editClassDivAppear", "true");
    addClassDiv.style.display = "block";
    editClassDiv.style.display = "none";
});

if(sessionStorage.getItem("editClassDivAppear", "true")){
    editClassDiv.style.display = "block";
    addClassDiv.style.display = "none";
}






