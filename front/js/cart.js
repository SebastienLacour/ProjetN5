let saveProduct = [];

console.log(saveProduct.length);

saveProduct = JSON.parse(localStorage.getItem("product"));

console.log(saveProduct);
console.log(saveProduct.length);



let cartDisplay = "";

// si le panier est vide afficher panier vide
for (i = 0; i < saveProduct.length; i++) {

  // zone de la page où le produit sera affiché

  const productCard = document.getElementById("cart__items");

if (saveProduct === null || saveProduct == 0) {
    
    const emptyCart =  
    `
    <section id="cart__items">panier vide</section>

    `;

    productCard.innerHTML = emptyCart;
    
} else {
// si le panier n'est pas vide, afficher les produits

    //for (j = 0; j < saveProduct; j++) {
      
        cartDisplay = cartDisplay +
         `
          <article class="cart__item" data-id="${saveProduct[i].id}" data-color="${saveProduct[i].color}">
                <div class="cart__item__img">
                  <img src="${saveProduct[i].image}" alt="${saveProduct[i].alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${saveProduct[i].name}</h2>
                    <p>${saveProduct[i].color}</p>
                    <p>${saveProduct[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${saveProduct[i].quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveProduct[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              `
              

              productCard.innerHTML = cartDisplay;
      
    }
  }  
  //}

  // bouton supprimer 

  const deleteItem= document.querySelectorAll(".deleteItem");
  console.log(deleteItem);
  console.log(deleteItem.length);

  for (let j = 0; j < deleteItem.length; j++) {

  // séléction de l'id du produit supprimé

  

  deleteItem[j].addEventListener("click", (event) => {
    event.preventDefault();
    console.log(saveProduct);

    let productRemoved = saveProduct[j].id;
    console.log(productRemoved);

    saveProduct = saveProduct.filter(function(el) {
    return el.id !== productRemoved});
      console.log(saveProduct);
    
    

    localStorage.setItem("product", JSON.stringify(saveProduct))

    window.location.href = "./cart.html";

    
  });
};

// montant total du panier

let totalPrice = [];
let totalQuantity = [];

for (let k = 0; k < saveProduct.length; k++) {
  
  let productPrice = saveProduct[k].price * saveProduct[k].quantity;

  totalPrice.push(productPrice);
  console.log(totalPrice);

  let productQuantity = parseInt(saveProduct[k].quantity);

  totalQuantity.push(productQuantity);
  console.log(totalQuantity);

}

const reducer = (accumulator,currentValue) => accumulator + currentValue;

const total = totalPrice.reduce(reducer);
const all = totalQuantity.reduce(reducer);

const finalQuantity = document.getElementById("totalQuantity");
finalQuantity.innerText = all;

const finalPrice = document.getElementById("totalPrice");
finalPrice.innerText = total;

// Envoie des données de formulaire dans le localStorage

// ecoutons l'evenement au clic du bouton commander 

const commandButton = document.getElementById("order");
console.log(commandButton);
commandButton.addEventListener("click", (Event) => {
  Event.preventDefault();
  const formValue = {
    prenom : document.getElementById("firstName").value,
    nom : document.getElementById("lastName").value,
    adresse : document.getElementById("address").value,
    ville : document.getElementById("city").value,
    email : document.getElementById("email").value,
  }

  // Validation du formulaire

  // Ne pas valider le formulaire s'il est vide

    // création de la variable qui testera la validité du prénom, du nom et de la ville

  
    let stringRegExp = new RegExp('^[A-Za-zé]{3,30}$');

    // création de la variable qui testera la validité de l'adresse

    let addressRegExp = new RegExp('^[a-zA-Z0-9 + \s]{3,70}$');

    // création de la variable qui testera la validité de l'email

    let emailRegExp = new RegExp('^[a-zA-Z0-9_@-]$');
    console.log(emailRegExp);

    // Création de la const pour le prénom 

    const firstName = formValue.prenom;

    // Création de la const pour le nom

    const lastName = formValue.nom;

    // Création de la const pour l'adresse
    const address = formValue.adresse;

    // Création de la const pour la ville

    const city = formValue.ville;

    // Création de la const pour l'email

    const email = formValue.email;

    // Controle des données en utilisant les variables regexp
    
    let validFirstName = stringRegExp.test(firstName);
    console.log(validFirstName);
    let validLastName = stringRegExp.test(lastName);
    console.log(validLastName);
    let validAddress = addressRegExp.test(address);
    console.log(validAddress);
    let validCity = stringRegExp.test(city);
    console.log(validCity); 
    /*let validEmail = emailRegExp.test(email);
    console.log(validEmail);*/

// Condition : si le formulaire est bien remplie, envoyer les donnnées dans le localStorage. Sinon, ne pas envoyer les données et afficher un message d'alerte
// si les valeurs sont valides, envoyer les valeurs dans le localstorage

if (validFirstName && validLastName && validAddress && validCity) {
  console.log("formulaire");
  localStorage.setItem("formValue",JSON.stringify(formValue));
  console.log(formValue);

  const sent = {
    saveProduct,
    formValue,
  }

  //window.location.href = "./confirmation.html";
  
  const postResults = fetch("https://restapi.fr/api/command" , {
  method: "POST",
  body: JSON.stringify(sent),
  headers: {
    "Content-Type" : "application/json"
  },
  })
  console.log("Récupération des résultats");
  console.log(postResults); 

  // Voir le résultat dans la console  

  postResults.then(async(response) => {
    try {
      console.log(response);
      const content = await response.json();
      console.log(content);

      // Récupération de l'id de la reponse du serveur

      console.log("id de la réponse");
      console.log(content._id);

      // Envoyer l'id dans le localstorage

      localStorage.setItem("id de la réponse", content._id);

      // Aller dans la page confirmation

      window.location.href = "./confirmation.html"

    }catch(e) {
      alert("erreur")
    }
  })

}

// si les valeurs ne sont pas valides, ne pas envoyer les valeurs et afficher un message d'alerte

else {
  alert("Veuillez bien remplir le formulaire");

}

 
})

// Voir ce qu'il y a réellement dans le serveur

/* const getResults = fetch("https://restapi.fr/api/command")
getResults.then(async(response) => {
  try {
    console.log(response);
    const serverData = await response.json();
    console.log(serverData);
  } catch(e) { 

  }
})

// Récupérer les données de formulaire dans une variable

/*const formGet = localStorage.getItem("formValue");

// convertir la chaine de caractère en objet Javascript

const getObject = JSON.parse(formGet);

// Mettre les valuers du localStorage dans le formulaire

document.getElementById("firstName").value = getObject.prenom;
document.getElementById("lastName").value = getObject.nom;
document.getElementById("address").value = getObject.adresse;
document.getElementById("city").value = getObject.ville;
document.getElementById("email").value = getObject.email; */




