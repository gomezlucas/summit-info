 
 
 
 async function loadDropdownsStep2(){
    console.log('ohh yes lo llamo')   
    const dropdownCountries = document.querySelector(".businessSectors");
    const sectores = await getSector(BASEURL)
    console.log(dropdownCountries)
    loadInfoDropdown(sectores, dropdownCountries)

 
  
 
}


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
        console.log(sectores)
        return sectores;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  //Function para cargar Código País
  function loadInfoDropdown(arrayInfo, dropdown) {
    console.log(arrayInfo, dropdown, 'aver')
  
      const container = dropdown.parentNode;
      console.log(container, 'the container is')
      const opciones = container.querySelector(".opciones");
      arrayInfo.forEach((data) => {
        const node = document.createElement("a");
        node.classList.add("opcion");
        node.setAttribute("tabindex", "0");
        node.href = "#";
  
        node.innerHTML = `
         <div class="contenido-opcion">
          <div class="textos">
            <h1 class="titulo option" option_value="${data.id}"}>${data.name}</h1>
          </div>
        </div>
         `;
        opciones.appendChild(node);
      });
  }
  