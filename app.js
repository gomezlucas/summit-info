const BASEURL = "https://stagingapi.thelogisticsworld.com/v1/events";

const emailNode = `<div class="form-field emails">
<label class="form_label" for="guests">Email</label>
<div class="form_input_wrapper">
  <input
    class="form_input email_invite required new_email"
    type="email"
    id="guests"
    name="guests"
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
  return validos;
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

// Función para obtener parametros de la URL
function getHashParams() {
  const url = window.location.href;

  const queryString = new URL(url).searchParams;

  const utmParams = {};

  for (const [key, value] of queryString.entries()) {
    utmParams[key] = value;
  }

  return utmParams;
}

// Función para hacer el fetch la Data
async function fetchAndgetUser(url, hash) {
  try {
    const response = await fetch(`${url}/register/${hash}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    if (responseData) {
      const user = responseData.user;
      return user;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener código país
async function getCountries(url) {
  try {
    const response = await fetch(`${url}/internationalPrefixes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    if (responseData) {
      const countries = responseData.internationalPrefixes;
      return countries;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//Function para cargar Código País
function loadCountryCode(countries) {
  const dropdownCountries = document.querySelectorAll(".countries_code");

  dropdownCountries.forEach((dropdown) => {
    const container = dropdown.parentNode;
    const opciones = container.querySelector(".opciones");
    countries.forEach((country) => {
      const node = document.createElement("a");
      node.classList.add("opcion");
      node.setAttribute("tabindex", "0");
      node.href = "#";

      node.innerHTML = `
       <div class="contenido-opcion">
        <img src="./assets/icons/mexico.png" alt="" />
        <div class="textos">
          <h1 class="titulo option" option_value="${country.id}"}>${country.dial_code}</h1>
        </div>
      </div>
       `;
      opciones.appendChild(node);
    });
  });
}

// Look for object base on Id

function lookForObject(array, id) {
  return array.find((object) => object.id === id);
}

// Función para cargar información Step 1
function loadInfoStep1(user, countries) {
  const email = document.getElementById("email");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const lastname_mother = document.getElementById("lastname_mother");
  const linkedin = document.getElementById("linkedin");
  const phone = document.getElementById("phone");
  const whatsapp_preference = document.getElementById("whatsapp_preference");
  const user_country_code = document.getElementById("user_country_code");
  const country_code_container = document.getElementById(
    "user_country_code_container"
  );

  email.value = user.email;
  firstname.value = user.firstname;
  lastname.value = user.lastname;
  lastname_mother.value = user.lastname_mother;
  linkedin.value = user.aditional_information.linkedin;
  phone.value = user.phone;
  whatsapp_preference.checked = user.aditional_information.whatsapp_preference;
  user_country_code.value = user.international_prefix_id;

  /*check for country code items */
  const country = lookForObject(countries, user.international_prefix_id);
  console.log(country, "country");

  /* Load Dropdown Country */
  const node = document.createElement("div");
  node.classList.add("contenido-select");
  node.innerHTML = `
    <div class="contenido-select">
         <div class="contenido-opcion">
          <img src="./assets/icons/mexico.png" alt="">
          <div class="textos">
          <h1 class="titulo option" option_value="${country.id}" }="">${country.dial_code}</h1>
          </div>
        </div>
     </div>
`;
  country_code_container.innerHTML = "";
  country_code_container.appendChild(node);
}

// Función para agregar EventListener a inputs required
function addEventListenerToInputs(campos) {
  campos.forEach((campo) => {
    campo.addEventListener("keyup", (e) => {
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

// Function para agregar EventListener a Emails input
function addEventListenerGuestEmail(campos) {
  campos.forEach((campo) => {
    campo.addEventListener("keyup", (e) => {
      if (campo.type === "email") {
        if (!validateEmail(campo.value)) {
          showValidationResultInput(campo, false);
        } else {
          showValidationResultInput(campo, true);
        }
      }
    });
  });
}

// Función para agregar EventListener a Selects
function addEventListenerToSelectJustData(campos) {
  campos.forEach((campo) => {
    campo.addEventListener("keyup", (e) => {
      const inputSelect = campo.parentNode.querySelector(".inputSelect");
      const labelSelect =
        inputSelect.parentNode.parentNode.querySelector("label");

      if (inputSelect.value == "") {
        campo.classList.add("error");
        labelSelect.classList.add("error");
      } else {
        campo.classList.remove("error");
        labelSelect.classList.remove("error");
      }
    });
  });
}

// Para accesibilidad simulo clicks,
const checkboxWrapper = document.querySelector(".checkbox-wsp");
const containerRadio = document.querySelectorAll(".container-radio");
const containerCheckbox = document.querySelectorAll(".container-checkbox-q");
const subscribeElements = document.querySelectorAll(".form-element");

checkboxWrapper.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Simular un clic en el checkbox
    const checkbox = checkboxWrapper.querySelector("input[type='checkbox']");
    checkbox.click();
  }
});

containerRadio.forEach((radio) => {
  radio.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Simular un clic en el checkbox
      const radioInput = radio.querySelector("input[type='radio']");
      radioInput.click();
    }
  });
});
containerCheckbox.forEach((label) => {
  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //const radioInput = label.querySelector("input[type='checkbox']");
      label.click();
    }
  });
});

subscribeElements.forEach((label) => {
  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const radioInput = label.querySelector("input[type='checkbox']");
      radioInput.click();
    }
  });
});

/* After Loading----------------------------------------- */
document.addEventListener("DOMContentLoaded", async function () {
  const plusSymbol = document.getElementById("plus_symbol_wrapper");
  const emailInput = document.getElementById("email");

  emailInput.focus();
  /* Evento para agregar los mails de invitados */
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
      const newEmails = document.querySelectorAll(".new_email");
      addEventListenerToInputs(newEmails);
    }
  });

  const inputNumero = document.querySelectorAll(".just_numbers");
  inputNumero.forEach((input) => {
    input.addEventListener("input", soloNumeros);
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
  const camposSelect = document.querySelectorAll(".select");
  const selectInputStep1 = document.querySelectorAll(".step-1 .select");

  /* Time Line Wrapper Car */
  const carWrapper = document.querySelector(".car_wrapper");
  const dosCircle = document.getElementById("number_dos_wrapper");
  const tresCircle = document.getElementById("number_tres_wrapper");
  const unoCheck = document.getElementById("uno_check");
  const dosCheck = document.getElementById("dos_check");
  const tresCheck = document.getElementById("tres_check");
  const timeLineWrapper = document.querySelector(".timeLine_wrapper");

  /* Variables Formulario Info User*/
  const { hash } = getHashParams();
  let user = await fetchAndgetUser(BASEURL, hash);
  console.log("the user is ", user);

  /*GetInfo DropDowns*/
  const countries = await getCountries(BASEURL);
  console.log(countries);

  /* Load Info DropDowns */
  loadCountryCode(countries);

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
        //   hiddenInput.value = e.currentTarget.querySelector(".titulo").innerText;
        hiddenInput.value = e.currentTarget
          .querySelector(".titulo")
          .getAttribute("option_value");

        /* Remuevo error, en el caso que haya */
        const parentElement = opcion.parentElement.parentElement.parentElement;
        const label = parentElement.querySelector(".form_label");
        const select = parentElement.querySelector(".select");
        label.classList.remove("error");
        select.classList.remove("error");
      });
    });

    selectElement.addEventListener("click", () => {
      selectElement.classList.toggle("active");
      opciones.classList.toggle("active");
    });
  });

  /* Load Step 1 */ if (user) {
    loadInfoStep1(user, countries);
  }

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
      ".step-2 .inputSelect.required"
    );
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
    console.log("submtio");
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
  addEventListenerToInputs(camposSteps);
  addEventListenerToSelectJustData(camposSelect);

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
