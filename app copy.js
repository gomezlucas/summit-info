const unoWhite = document.getElementById("number_uno_wrapper");
const dosWhite = document.getElementById("number_dos_wrapper");
const tresWhite = document.getElementById("number_tres_wrapper");
const carWrapper = document.querySelector(".car_wrapper");

const elementsToClick = [dosWhite, tresWhite];

elementsToClick.forEach((element) =>
  element.addEventListener("click", () => {
    const posicionX = element.offsetLeft;
    console.log(posicionX);
    carWrapper.style.left = posicionX - 80 + "px";
    element.querySelector(".number_blue").style.opacity = 1;
  })
);

const emailNode = `<div class="form-field emails">
<label class="form_label" for="email-invite">Email</label>
<div class="form_input_wrapper">
  <input
    class="form_input email_invite"
    type="text"
    id="email-invite"
    name="email-invite"
    placeholder="invitado@correo.com"
  />
  <img
    src="./assets/icons/icon-ok.svg"
    class="hero_input_result icon_ok"
    alt=""
  />
  <img
    src="./assets/icons/icon-error.svg"
    class="hero_input_result icon_error"
    alt=""
  />
</div>
</div>`;

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

// Función para mostrar el resultado de la validación
function showValidationResult(email, isValid) {
  const parentNode = email.parentNode;
  const labelSibling = parentNode.parentNode.querySelector("label");
  console.log(labelSibling, "the label sibilng", parentNode);
  const okIcon = parentNode.querySelector(".icon_ok");
  const errorIcon = parentNode.querySelector(".icon_error");

  console.log(okIcon, "the ok icon", email.parentNode);

  if (email.value == "") {
    /* okIcon.classList.remove("active");
      errorIcon.classList.remove("active");
      email.classList.remove("error");*/
    return;
  } else if (isValid) {
    okIcon.classList.add("active");
    errorIcon.classList.remove("active");
    email.classList.remove("error");
    labelSibling.classList.remove("error");
  } else {
    okIcon.classList.remove("active");
    errorIcon.classList.add("active");
    email.classList.add("error");
    labelSibling.classList.add("error");
  }
}

/* Checking Invite Email Invites */
function checkEmailInvites() {
  const emailInputs = document.querySelectorAll(".email_invite");
  emailInputs.forEach((emailInput) => {
    emailInput.addEventListener("keyup", (e) => {
      console.log(emailInput.value);
      const isValid = validateEmail(emailInput.value);
      console.log(isValid);
      showValidationResult(emailInput, isValid);
    });
  });
}

/* After Loading----------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const plusSymbol = document.getElementById("plus_symbol_wrapper");
  plusSymbol.addEventListener("click", (e) => {
    const emailFormsQuantity =
      document.querySelectorAll(".email_invite").length;
    if (emailFormsQuantity < 9) {
      const newEmailContainer = document.createElement("div");
      newEmailContainer.innerHTML = emailNode;
      const emailWrapper = document.querySelector(".form_emails_wrapper");
      emailWrapper.appendChild(newEmailContainer);
      checkEmailInvites();
    }
  });
  checkEmailInvites();

  /* Select Box*/
  const select = document.querySelector("#select");
  const opciones = document.querySelector("#opciones");
  const contenidoSelect = document.querySelector("#select .contenido-select");
  const hiddenInput = document.querySelector("#inputSelect");
  const defaultOption = document.querySelector(".opcion.default")

  document.querySelectorAll("#opciones > .opcion").forEach((opcion) => {
    opcion.addEventListener("click", (e) => {
      e.preventDefault();
      contenidoSelect.innerHTML = e.currentTarget.innerHTML;
       select.classList.toggle("active");
      opciones.classList.toggle("active");
      hiddenInput.value = e.currentTarget.querySelector(".titulo").innerText;
    });
  });
  
  select.addEventListener("click", () => {
    select.classList.toggle("active");
    opciones.classList.toggle("active");
  });
  
  /* Load default option 
   contenidoSelect.innerHTML = `<div class="contenido-opcion">
   <img src="./assets/icons/mexico.png" alt="">
   <div class="textos">
     <h1 class="titulo option">+56</h1>
    </div>
 </div>`  */
});
/* End After Loading----------------------------------------- */

