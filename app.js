const emailNode = `<div class="form-field emails">
<label class="form_label" for="email-invite">Email</label>
<div class="form_input_wrapper">
  <input
    class="form_input email_invite required new_email"
    type="email"
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

function soloNumeros(e) {
  const input = e.target;
  const value = input.value;
  const regex = /[^0-9]/g; // Expresión regular que elimina caracteres no numéricos
  input.value = value.replace(regex, ""); // Reemplaza caracteres no numéricos por ""
}

// Function para Validar Inputs  text/ email
function validarCampos(campos) {
  let validos = true; 

  // Recorrer cada campo
  for (const campo of campos) {
    // Obtener el valor del campo
    const valor = campo.value.trim();

    // Si el valor está vacío, mostrar un mensaje de error y cambiar la bandera
    if (valor === "") {
      showValidationResultInput(campo);
      validos = false;
    } else {
      campo.classList.remove("error"); 
    }
  }

  return validos;
}
// Function para Validar Inputs  select
function validarCamposSelect(campos) {
  let validos = true;

  for (const campo of campos) {
    // Obtener el valor del campo
    const valor = campo.value.trim();
     const parentNode = campo.parentNode.parentNode;
    const select = parentNode.querySelector(".select");
    const label = parentNode.querySelector(".form_label");
     if (valor == "") {
      select.classList.add("error");
      label.classList.add("error");
      validos = false;
    } else {
      select.classList.remove("error");
      label.classList.remove("error");
    }
  }
  return validos
}
// Función para mostrar el resultado de la validación de los inputs type text/email
function showValidationResultInput(campo, valid) {
  const parentNode = campo.parentNode;
  const labelSibling = parentNode.parentNode.querySelector("label");
  const okIcon = parentNode.querySelector(".icon_ok");
  const errorIcon = parentNode.querySelector(".icon_error");

  if (!valid) {
    okIcon.classList.remove("active");
    errorIcon.classList.add("active");
    campo.classList.add("error");
    labelSibling.classList.add("error");
  } else {
    okIcon.classList.add("active");
    errorIcon.classList.remove("active");
    campo.classList.remove("error");
    labelSibling.classList.remove("error");
  }
}

// Función para agregar EventListener a inputs 
function addEventListenerToInputs(campos){
  campos.forEach((campo) => {
    campo.addEventListener("keyup", (e) => {
      console.log("entro", campo)
      if (campo.value == "") {
        showValidationResultInput(campo, false);
      } else {
        showValidationResultInput(campo, true);

        if (campo.type === "email") {
          if (!validateEmail(campo.value)) {
            showValidationResultInput(campo, false);
          }
        }
      }
    });
  });
}

// Función para agregar EventListener a Selects 
function addEventListenerToSelectJustData(campos){
  
  campos.forEach((campo) => {
    
    campo.addEventListener("keyup", (e) => {
      const inputSelect = campo.parentNode.querySelector(".inputSelect")
      const labelSelect = inputSelect.parentNode.parentNode.querySelector("label")
      console.log("entro", campo, labelSelect)
      
      if (inputSelect.value == "") {
        campo.classList.add("error");
        labelSelect.classList.add("error")

      } else {
        campo.classList.remove("error");        
        labelSelect.classList.remove("error")
      }
    });
  });
}

// Para accesibilidad simulo clicks, 
const checkboxWrapper = document.querySelector(".checkbox-wsp");
const containerRadio = document.querySelectorAll(".container-radio")
const containerCheckbox = document.querySelectorAll(".container-checkbox-q")
const subscribeElements = document.querySelectorAll(".form-element")

 checkboxWrapper.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Simular un clic en el checkbox
    const checkbox = checkboxWrapper.querySelector("input[type='checkbox']");
    checkbox.click();
  }
});

containerRadio.forEach(radio => {
  radio.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Simular un clic en el checkbox     
      const radioInput = radio.querySelector("input[type='radio']");
      radioInput.click();
    }
  });
});
containerCheckbox.forEach(label => {
  label.addEventListener("keydown", (event) => {
    console.log(label)
    if (event.key === "Enter") {
      event.preventDefault();
      //const radioInput = label.querySelector("input[type='checkbox']");
      label.click();
    }
  });
});

subscribeElements.forEach(label => {
  label.addEventListener("keydown", (event) => {
     if (event.key === "Enter") {
      event.preventDefault();
       const radioInput = label.querySelector("input[type='checkbox']");
      radioInput.click();
    }
  });
});



/* After Loading----------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const plusSymbol = document.getElementById("plus_symbol_wrapper");
  const emailInput = document.getElementById("email");

  emailInput.focus();
  plusSymbol.addEventListener("click", (e) => {
    const emailWrapper = document.querySelector(".form_emails_wrapper");
   
    const emailFormsQuantity =
      document.querySelectorAll(".email_invite").length;
    if (emailFormsQuantity < 9) {
      for (let i = 0; i < 3; i++) {
        const newEmailContainer = document.createElement("div");
        newEmailContainer.innerHTML = emailNode;
        emailWrapper.appendChild(newEmailContainer);
        plusSymbol.style.top = "auto";
        plusSymbol.style.bottom = "36px";
      }
      const newEmails = document.querySelectorAll('.new_email')
      addEventListenerToInputs(newEmails)
    }
  });

  const inputNumero = document.querySelectorAll(".just_numbers");
  inputNumero.forEach(input => {
    input.addEventListener("input", soloNumeros);    
  });


  /* Select Box, creo los Selects */
  const selects = document.querySelectorAll(".selectbox");
  selects.forEach((select) => {
    const selectElement = select.querySelector(".select");
    const opciones = select.querySelector(".opciones");
    const contenidoSelect = select.querySelector(".contenido-select");
    const hiddenInput = select.querySelector(".inputSelect");
    const options = select.querySelectorAll(".opcion");

    options.forEach((opcion) => {
      opcion.addEventListener("click", (e) => {
        e.preventDefault();
        contenidoSelect.innerHTML = e.currentTarget.innerHTML;
        selectElement.classList.toggle("active");
        opciones.classList.toggle("active");
        hiddenInput.value = e.currentTarget.querySelector(".titulo").innerText;
        
        /* Remuevo error, en el caso que haya */                            
        const parentElement = opcion.parentElement.parentElement.parentElement
        const label = parentElement.querySelector(".form_label")
        const select = parentElement.querySelector(".select")
        label.classList.remove("error")
        select.classList.remove("error")
       });
    });

    selectElement.addEventListener("click", () => {
      selectElement.classList.toggle("active");
      opciones.classList.toggle("active");
    });
  });

  /* Handle Otro Option Question 3*/
  let optionOtro = document.getElementById("checkbox_otro");
  let inputOtro = document.getElementById("input_otro_hidden");

  optionOtro.addEventListener("click", (e) => {
    if (optionOtro.querySelector("input").checked) {
      inputOtro.style.display = "block";
    } else {
      inputOtro.style.display = "none";
      inputOtro.value = "";
    }
  });

  /* Handle Formulario  */

  const submitS1Button = document.getElementById("form_step-1");
  const submitS2Button = document.getElementById("form_step-2");
  const submitS3Button = document.getElementById("form_step-3");
  const step1Window = document.querySelector(".step-1");
  const step2Window = document.querySelector(".step-2");
  const step3Window = document.querySelector(".step-3");
  const step4Window = document.querySelector(".step-4");
  const camposSteps = document.querySelectorAll(".form_input.required");
  const camposSelect = document.querySelectorAll(".select")
  const selectInputStep1 = document.querySelectorAll(".step-1 .select");
 
  /* Time Line Wrapper Car */
  const carWrapper = document.querySelector(".car_wrapper");
  const dosCircle = document.getElementById("number_dos_wrapper");
  const tresCircle = document.getElementById("number_tres_wrapper");
  const unoCheck = document.getElementById("uno_check");
  const dosCheck = document.getElementById("dos_check");
  const tresCheck = document.getElementById("tres_check");
  const timeLineWrapper = document.querySelector(".timeLine_wrapper");

  /* Submision Formulario step 1*/
  submitS1Button.addEventListener("submit", (e) => {
    e.preventDefault();
    const newsletterChecked = document.querySelector(
      'input[name="newsletter"]'
    );

    /* Validador de Campos */
    const camposStep = document.querySelectorAll(
      ".step-1 .form_input.required"
    );
    const validInputs = validarCampos(camposStep);
    const camposSelect = document.querySelectorAll(
      ".step-1 .inputSelect.required"
    );
    const validSelects = validarCamposSelect(camposSelect);
     if (!validInputs || !validSelects) {
      return;
    }

    step1Window.classList.add("swapping");
    step1Window.addEventListener(
      "animationend",
      () => {
        window.scrollTo(0, 0);
        setTimeout(() => {
          step1Window.classList.add("hide");
          step1Window.classList.remove("swapping");
          step2Window.classList.add("show");
          carWrapper.classList.add("move_step_2");
          dosCircle.classList.add("active");
          unoCheck.style.opacity = 1;
        }, 500);
      },
      { once: true }
    );
  });

  submitS2Button.addEventListener("submit", (e) => {
    e.preventDefault();
  /* Validador de Campos */
  const camposStep = document.querySelectorAll(
    ".step-2 .form_input.required"
  );
  const validInputs = validarCampos(camposStep);
  const camposSelect = document.querySelectorAll(
    ".step-2 .inputSelect.required");
  const validSelects = validarCamposSelect(camposSelect);
  if (!validInputs || !validSelects) {
    return;
  }

    step2Window.classList.add("swapping");
    step2Window.addEventListener(
      "animationend",
      () => {
        window.scrollTo(0, 0);
        setTimeout(() => {
          step2Window.classList.add("hide");
          step2Window.classList.remove("show");
          step2Window.classList.remove("swapping");
          step3Window.classList.add("show");
          carWrapper.classList.add("move_step_3");
          dosCheck.style.opacity = 1;
          tresCircle.classList.add("active");
        }, 500);
      },
      { once: true }
    );
  });

  submitS3Button.addEventListener("submit", (e) => {
    console.log("submtio")
    e.preventDefault();
    step3Window.classList.add("swapping");

    step3Window.addEventListener(
      "animationend",
      () => {
        window.scrollTo(0, 0);
        tresCheck.style.opacity = 1;
        timeLineWrapper.style.opacity = 0;
        setTimeout(() => {
          step3Window.classList.add("hide");
          step3Window.classList.remove("show");
          step3Window.classList.remove("swapping");
          step4Window.classList.add("show");
          timeLineWrapper.style.height = 0;
        }, 500);
      },
      { once: true }
    );
  });

  /* Handle Input Listener */
  addEventListenerToInputs(camposSteps)
  addEventListenerToSelectJustData(camposSelect)

  

  /* Submision Formulario step 3*/
  const form3 = document.getElementById("form_step-3");
  form3.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstTimeValue = document.querySelector(
      'input[name="firstTime"]:checked'
    ).value;
    //console.log(firstTimeValue);

    const motivoVisitaValues = [];
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach(function (checkbox) {
        if (checkbox.checked) {
          motivoVisitaValues.push(checkbox.parentNode.textContent.trim());
        }
      });
    const categoriasInteresValues = [];
    document
      .querySelectorAll(
        '.form_checkbox_buttons_container-2 input[type="checkbox"]'
      )
      .forEach(function (checkbox) {
        if (checkbox.checked) {
          categoriasInteresValues.push(checkbox.parentNode.textContent.trim());
        }
      });
    //console.log(categoriasInteresValues);
    const otroInputValue = document.getElementById("input_otro_hidden").value;
    // console.log(otroInputValue);
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
