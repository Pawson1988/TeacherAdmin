editClassDiv = document.querySelector(".edit-class-div");
startEditBtn = document.querySelectorAll(".start-edit-btn");
addClassDiv = document.querySelector(".add-a-class-div");
addClassFromEditBtn = document.querySelector(".add-class-from-edit-btn");

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






