const successMsg = document.getElementById("success");
const nameBox = document.getElementById("emailName");
const zipBox = document.getElementById("emailZip");
const emailBox = document.getElementById("emailAddress");
const phoneBox = document.getElementById("emailPhone");
const bodyBox = document.getElementById("emailBody");
const notiText = document.getElementById("notiText");
const subject = document.getElementById("subjectline");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const promoPanel = document.querySelector(".promo");
const promoEmail = document.getElementById("mce-EMAIL");

const sections = document.querySelectorAll(".trigger");
let doneTrigger = 0;
checkSection();

window.addEventListener("scroll", checkSection);

function checkSection() {
  const triggerBottom = (window.innerHeight / 5) * 3;

  sections.forEach((section) => {
    const partTop = section.getBoundingClientRect().top;

    if (partTop < triggerBottom) {
      if (doneTrigger === 0) {
        promoPanel.classList.remove("hidden");
        overlay.classList.remove("hidden");
        doneTrigger++;
      }
    }
  });
}

function modalClose() {
  promoPanel.classList.add("hidden");
  overlay.classList.add("hidden");
}

closeModal.addEventListener("click", modalClose);
overlay.addEventListener("click", modalClose);

function show() {
  if (
    nameBox.value === "" ||
    zipBox.value === "" ||
    emailBox.value === "" ||
    phoneBox.value === "" ||
    bodyBox.value === ""
  ) {
    notiText.textContent = "Please fill out all fields";
    successMsg.style.backgroundColor = "red";
    successMsg.style.display = "block";
    setTimeout(function () {
      successMsg.style.display = "none";
    }, 5000);
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  subject.value = `Luxury Window Washing // Form Submission From ${nameBox.value}`;
  const myForm = event.target;
  const formData = new FormData(myForm);
  if (
    nameBox.value !== "" &&
    zipBox.value !== "" &&
    emailBox.value !== "" &&
    phoneBox.value !== "" &&
    bodyBox.value !== ""
  ) {
    console.log(new URLSearchParams(formData).toString());
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        promoEmail.value = emailBox.value;
        document.getElementById("mc-embedded-subscribe").click();
        notiText.textContent = `Submission Successful`;
        successMsg.style.backgroundColor = "Chartreuse";
        successMsg.style.display = "block";
        nameBox.value = "";
        zipBox.value = "";
        emailBox.value = "";
        phoneBox.value = "";
        bodyBox.value = "";
      })
      .catch((error) => {
        notiText.textContent = error;
        successMsg.style.backgroundColor = "red";
        successMsg.style.display = "block";
      });
  }
  setTimeout(function () {
    successMsg.style.display = "none";
  }, 5000);
};

document
  .getElementById("contact_form")
  .addEventListener("submit", handleSubmit);
