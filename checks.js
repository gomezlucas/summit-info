async function getVisitPurposes(url) {
  try {
    const response = await fetch(
      `${url}/visitPurposes?event_type_id=1&language=es`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    if (responseData) {
      const visitPurposes = responseData.visitPurposes;
      return visitPurposes;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getSuppliersCategories(url) {
  try {
    const response = await fetch(`${url}/supplierCategories/1?language=es`, {
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
      const supplierCategories = responseData.supplierCategories;
      return supplierCategories;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getNewsletter(url){
    try {
        const response = await fetch(`${url}/newsletters?event_type_id=1&language=es`, {
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
          const newsletters = responseData.newsletters;
          return newsletters;
        }
      } catch (error) {
        console.error("Error:", error);
      }
}

function splitArrayInTwo(array) {
  const mitad1 = array.slice(0, Math.ceil(array.length / 2));
  const mitad2 = array.slice(Math.ceil(array.length / 2));
  return { mitad1, mitad2 };
}

async function createCategories() {
  const supplierCategories = await getSuppliersCategories(BASEURL);

  const supplier_column1 = document.getElementById("supplier_column1")
  const supplier_column2 = document.getElementById("supplier_column2")
  
  const { mitad1, mitad2 } = splitArrayInTwo(supplierCategories);
  supplier_column1.innerHTML = ''
 
  mitad1.forEach(item=> {
    const node = document.createElement("a");
    node.classList.add("opcion");
    node.setAttribute("tabindex", "0");
    node.href = "#";

    node.innerHTML = `
        <label class="container-checkbox-q" tabindex="0"
  >${item.option}
  <input type="checkbox" name="supplierCategories" option="${item.option}" tabindex="-1"  value="${item.id}"/>
  <span class="checkmark-q" tabindex="-1"></span>
    </label>
         `;
         supplier_column1.appendChild(node);
  })

  mitad2.forEach(item=> {
    const node = document.createElement("a");
    node.classList.add("opcion");
    node.setAttribute("tabindex", "0");
    node.href = "#";

    node.innerHTML = `
        <label class="container-checkbox-q" tabindex="0"
  >${item.option}
  <input type="checkbox" name="supplierCategories" option="${item.option}" tabindex="-1"  value="${item.id}"/>
  <span class="checkmark-q" tabindex="-1"></span>
    </label>
         `;
         supplier_column2.appendChild(node);
  })


 
}

function createNewsletters(newsletter){
    const newsletter_container = document.getElementById("newsletter_container")
    newsletter.forEach(newsletter=> {
     const node = document.createElement("div");
    node.classList.add("form-element");
    node.setAttribute("tabindex", "0");
    node.href = "#";
    const elementName = `newsletter-${newsletter.id}`
    node.innerHTML = `
    <input
    type="checkbox"
    name="newsletter"
    value="${newsletter.id}"
    id="${elementName}"
  />
  <label for="${elementName}">
    <div class="icon">
      <img
        class="checkbox_img_desktop"
        src="./assets/img/${newsletter.image_name}.png"
        alt=""
      />
      <img
        class="checkbox_img_mobile"
        src="./assets//img/${newsletter.image_name}-mob.png"
        alt=""
      />
    </div>
    <div class="title">${newsletter.name}</div>
    <div class="subscription_tag_wrapper">
      <div class="subscription_tag">
        <p>SUSCRIPTO</p>
      </div>
    </div>
  </label>
         `;
         newsletter_container.appendChild(node);
  })

}

async function loadChecksStep3() {
  const visitPurposes = await getVisitPurposes(BASEURL);
  const supplierCategoriesContainer = document.querySelector(
    "#supplierCategories_container"
  );

  const newsletters = await getNewsletter(BASEURL)
   createNewsletters(newsletters)

  const visitPurposes_container = document.getElementById(
    "visitPurposes_container"
  );
  visitPurposes.forEach((purpose) => {
    const node = document.createElement("a");
    node.classList.add("opcion");
    node.setAttribute("tabindex", "0");
    node.href = "#";

    node.innerHTML = `
        <label class="container-checkbox-q" tabindex="0"
  >${purpose.option}
  <input type="checkbox" name="visitPurposes" option="${purpose.option}" tabindex="-1"  value="${purpose.id}"/>
  <span class="checkmark-q" tabindex="-1"></span>
    </label>
         `;
    visitPurposes_container.appendChild(node);

    if (purpose.id == "1") {      
      const question3Container = document.getElementById("question3_container");
      node.addEventListener("change", function () {
        if (question3Container.classList.contains("show")) {
          question3Container.classList.remove("show");
        } else {
          createCategories();
          question3Container.classList.add("show");
        }
      });
    }
  });

  const proveduriaNode = document.querySelector(
    'input[type="checkbox"][name="visitPurposes"]:checked'
  );
   if (proveduriaNode) {
     proveduriaNode.addEventListener("change", function () {
     });
  }




  return;
  supplierCategoriesContainer.addEventListener("change", async function () {
    // Get the checked radio button
    const checkedRadio = this.querySelector('input[type="radio"]:checked');
  });
}
