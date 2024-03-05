/*document.querySelector('input[name="businessSectors"]:checked') */

// Function para obtener sector de la empresa
async function getSector(url) {
  try {
    const response = await fetch(`${url}/businessSectors`, {
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
      const sectores = responseData.businessSectors;
      return sectores;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener subsector de la empresa
async function getSubSector(url, id) {
  try {
    const response = await fetch(`${url}/businessSubsectors/${id}`, {
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
      const subSectores = responseData.businessSubsectors;
      return subSectores;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener el tamaño de la empresa
async function getcompanySizes(url) {
  try {
    const response = await fetch(`${url}/companySizes`, {
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
      const companySizes = responseData.companySizes;
      return companySizes;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener Cargo / Positions
async function getPositions(url) {
  try {
    const response = await fetch(`${url}/positions`, {
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
      const positions = responseData.positions;
      return positions;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener Positions Areas
async function getPositionAreas(url) {
  try {
    const response = await fetch(`${url}/positionAreas`, {
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
      const positionAreas = responseData.positionAreas;
      return positionAreas;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// Function para obtener los estados en base al país
async function getEstado(url, id) {
  try {
    const response = await fetch(`${url}/states/${id}`, {
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
      const states = responseData;
      return states;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener países
async function getCountriesCompany(url) {
  try {
    const response = await fetch(`${url}/countries`, {
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
      const countries = responseData;
      return countries;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para obtener Info con CP Mex
async function getInfoWithCP(url, cp) {
  try {
    const response = await fetch(`${url}/cps/${cp}`, {
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
      const dataAddress = responseData;
      return dataAddress;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function para setear el valor del Dropdown
function setDropdownValue(dropdownId, object) {
  const dropdownElement = document.getElementById(dropdownId);
  console.log(dropdownElement, "the drop");

  deleteInfoDropdown(dropdownElement);
  loadInfoDropdown(object, dropdownElement, dropdownId);
  const label = dropdownElement.parentNode.querySelectorAll("label")[0];
  label.click();
}

//Función handle para Mexico CP
async function handleMexicoCP(e) {
  if (e.target.value.length > 4) {
    const dataAddress = await getInfoWithCP(BASEURL, e.target.value);    
    setDropdownValue("states", dataAddress.states);
    setDropdownValue("delegations", dataAddress.delegations);
    setDropdownValue("colonies", dataAddress.colonies);
  }
}

// function para borrar las Opciones del Dropdown
function deleteInfoDropdown(dropdown) {
  console.log(dropdown, "a borrar");
  const ul = dropdown.parentNode.querySelector("ul");
  ul.innerHTML = "";
  const inputsToRemove = dropdown.querySelectorAll(
    'input[type="radio"]:not(.select_placeholder)'
  );

  inputsToRemove.forEach((input) => input.remove());
}

//Function para cargar Dropdowns
function loadInfoDropdown(arrayInfo, dropdown, nameInput) {
  arrayInfo.forEach((element) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = nameInput;
    input.id = nameInput + "-" + Object.values(element)[0];

    input.value = Object.values(element)[0];

    if (nameInput == "countries") {
      input.title = element.name;
    } else if (
      nameInput == "states" ||
      nameInput == "delegations" ||
      nameInput == "colonies"
    ) {
      input.title = element.name;
    } else {
      input.title = Object.values(element)[0];
    }

    dropdown.appendChild(input);

    const ul = dropdown.parentNode.querySelector("ul");
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.setAttribute("for", `${nameInput}-${Object.values(element)[0]}`);

    if (nameInput == "countries") {
      label.textContent = element.name;
    } else if (
      nameInput == "states" ||
      nameInput == "delegations" ||
      nameInput == "colonies"
    ) {
      label.textContent = element.name;
    } else {
      label.textContent = Object.values(element)[0];
    }
    li.appendChild(label);
    ul.appendChild(li);
  });
}

function optionDropdownEventListener() {
  const options = document.querySelectorAll(".list>li>label");

  options.forEach((option) => {
    option.addEventListener("click", function () {
      const summaryNode = option.parentNode.parentNode.parentNode;
      summaryNode.removeAttribute("open");
    });
  });
}

function closeAllDropdownsExcept(openDropdown) {
  const dropdowns = document.querySelectorAll("details.custom-select");
  for (const dropdown of dropdowns) {
    if (dropdown !== openDropdown) {
      closeDropdown(dropdown);
      dropdown.removeAttribute("open");
    }
  }
}

function selectDropdownEventListener() {
  const dropdowns = document.querySelectorAll("details.custom-select");

  dropdowns.forEach((dropdown) => {
    // agrego action a input placeholder
    const placeholder = dropdown.querySelector(".select_placeholder");

    dropdown.addEventListener("click", function () {
      if (!dropdown.getAttribute("open")) {
        for (const element of dropdowns) {
          if (element !== dropdown) {
            element.removeAttribute("open");
          }
        }
      }
    });

    placeholder.addEventListener("click", function () {
      if (dropdown.getAttribute("open")) {
        dropdown.removeAttribute("open");
      } else {
        dropdown.setAttribute("open", true);
      }
    });
  });
}

async function loadDropdownsStep2() {
  const dropdownBusiness = document.querySelector("#businessSectors");
  const dropdownBusinessSubsectors = document.querySelector(
    "#businessSubsectors"
  );
  const dropdowncompanySizes = document.querySelector("#companySizes");
  const dropdownPositions = document.querySelector("#positions");
  const dropdownPositionsAreas = document.querySelector("#positionAreas");
  const dropdownCountries = document.querySelector("#countries");
  const dropdownStates = document.querySelector("#states");
  const customSelects = document.querySelectorAll('.custom-select')


  const sectores = await getSector(BASEURL);
  loadInfoDropdown(sectores, dropdownBusiness, "businessSectors");

  const companySizes = await getcompanySizes(BASEURL);
  loadInfoDropdown(companySizes, dropdowncompanySizes, "companySizes");

  const positions = await getPositions(BASEURL);
  loadInfoDropdown(positions, dropdownPositions, "positions");

  const positionAreas = await getPositionAreas(BASEURL);
  loadInfoDropdown(positionAreas, dropdownPositionsAreas, "positionAreas");

  const countriesCompany = await getCountriesCompany(BASEURL);
  loadInfoDropdown(countriesCompany, dropdownCountries, "countries");

  

 
  dropdownBusiness.addEventListener("change", async function () {
    // Get the checked radio button
    const checkedRadio = this.querySelector('input[type="radio"]:checked');

    if (checkedRadio) {
      // Access the value and title of the checked radio button
      const checkedValue = checkedRadio.value;
      const checkedTitle = checkedRadio.title;

      console.log(`Selected value: ${checkedValue}, Title: ${checkedTitle}`);
      const giroEmpresa = await getSubSector(BASEURL, 1);
      deleteInfoDropdown(dropdownBusinessSubsectors);
      loadInfoDropdown(
        giroEmpresa,
        dropdownBusinessSubsectors,
        "businessSubsectors"
      );
      optionDropdownEventListener();

      // You can perform other actions based on the checked value here,
      // such as updating the UI, sending data to a server, etc.
    }
  });

  dropdownCountries.addEventListener("change", async function () {
    const checkedRadio = this.querySelector('input[type="radio"]:checked');

    if (checkedRadio) {
      // Access the value and title of the checked radio button
      const checkedValue = checkedRadio.value;
      const checkedTitle = checkedRadio.title;
      const inputColonyMex = document.querySelector(".colonia_mex");
      const inputDelegationMex = document.querySelector(".delegation_mex")
      const inputDelegationNoMex = document.querySelector(".delegation_noMex")
 
      //Elimino inputs y dropdowns  cargados 
      deleteInfoDropdown(document.querySelector('#delegations'))
      deleteInfoDropdown(document.querySelector('#colonies'))
      deleteInfoDropdown(document.querySelector('#states'))
      document.querySelector("#cp").value = ''
      document.querySelector("#street").value = ''
      document.querySelector('#street_number').value = ''
      document.querySelector('#delegation_name').value = ''
      // Elimino validaciones
      const cp = document.querySelector('#cp').parentNode
      const street = document.querySelector('#street').parentNode
      const street_number = document.querySelector('#street_number').parentNode
      cp.querySelector('img').classList.remove('active')
      street.querySelector('img').classList.remove('active')
      street_number.querySelector('img').classList.remove('active')
 
      console.log(`Selected value: ${checkedValue}, Title: ${checkedTitle}`);
      const states = await getEstado(BASEURL, checkedValue);

      console.log(checkedValue !== "2", "the state", checkedValue);
      if (checkedValue !== "2") {
        inputColonyMex.style.display = "none"
        inputDelegationMex.style.display = "flex"
        inputDelegationNoMex.style.display = "none"
        deleteInfoDropdown(dropdownStates);
        loadInfoDropdown(states, dropdownStates, "states");
        optionDropdownEventListener();
        cp.removeEventListener("keyup", handleMexicoCP);
      } else {
        inputColonyMex.style.display = "flex"
        inputDelegationNoMex.style.display = "flex"
        inputDelegationMex.style.display = "none"


        deleteInfoDropdown(dropdownStates);
        const cp = document.getElementById("cp");
        cp.addEventListener("keyup", handleMexicoCP);
      }

      // You can perform other actions based on the checked value here,
      // such as updating the UI, sending data to a server, etc.
    }
  });

  customSelects.forEach(select => {
    select.addEventListener("change", function(){
      console.log('ah cambiado')
      const radioButtons = select.querySelectorAll('input[type="radio"]');

      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          radioButton.parentNode.classList.remove("error")
          const label = radioButton.parentNode.parentNode.parentNode.querySelector(".form_label")
          console.log(label, 'the parent')
          label.classList.remove("error")
 
        }
      }
      console.log(radioButtons, 'radio')
    })
  });



  optionDropdownEventListener();
  selectDropdownEventListener();
}
