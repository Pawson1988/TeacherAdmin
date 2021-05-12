const emailPopUpBtn = document.querySelector(".email-pop-up-btn");
const emailPopUp = document.querySelector(".email-pop-up");
const clickOffEmailFormBtn = document.querySelector(".click-off-email-btn");

emailPopUpBtn.addEventListener("click", () => {
    emailPopUp.style.display = "block";
});

clickOffEmailFormBtn.addEventListener("click", () => {
    emailPopUp.style.display = "none";
});