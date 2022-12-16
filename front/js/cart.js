/**
 *  Création d'un tableau vide qui va récupérer les données enregistrées de la page produit pour les afficher dans la page panier
 * @type {Array}
 */
let getProduct = JSON.parse(localStorage.getItem("produit"));
console.log(getProduct)

// Si le localStorage est vide, effacer la clé "produit"
if (getProduct.length == 0) {
  console.log(true)
  localStorage.removeItem("produit")
}
/**
 *  Nouveau tableau vide ou l'on stocke les données que va nous retourner la methode fetch en dessous.
 * @type {Array}
 */
let urlData = [];

const fetchProduct = async () => {
  await fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((promise) => {
      // Ici on transfère la promesse le tableau urlData
      urlData = promise;
      console.log(urlData)
    })
    .catch((error) => console.error("Erreur = " + error));
};
fetchProduct()

/**
 * Création de la variable qui contendra le code pour afficher les différents produits dans la page panier
 * @type {Text}
 */
let display = "";

//Variable qui va récupérer un tableau des quantités après la modification
let newQuantity = [];

// Récupération de la balise HTML où les produits séléctionnés seront affichés
const productCard = document.getElementById("cart__items");

// si le panier est vide 
if (getProduct === null || getProduct == 0) {

  // Mettre le nombre d'article et le prix total à 0
  document.getElementById('totalQuantity').innerText = 0
  document.getElementById('totalPrice').innerText = 0
}

// Fonction qui affichera les produits de l'api dans la page panier
const cartDisplay = async () => {
  await fetchProduct()
  console.log(getProduct)
  console.log(getProduct.length)

  // Création d'une boucle 
  for (i = 0; i < getProduct.length; i++) {
    console.log(getProduct[i].id)
    console.log(urlData[i]._id)

    /**
     * Création d'une constante qui récupère le bon prix du produit dans le tableau de la promise
     * @type {Number}
     */
    const productPrice = urlData.find((el) => el.name === getProduct[i].name).price
    console.log(productPrice)
    // si le panier n'est pas vide, afficher les produits

    // Remplissage de la variable 'cartDisplay' avec les informations pour afficher les différents produits dans la page panier
    display = display +
      `
          <article class="cart__item" data-id="${getProduct[i].id}" data-color="${getProduct[i].color}">
                <div class="cart__item__img">
                  <img src="${getProduct[i].image}" alt="${getProduct[i].alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${getProduct[i].name}</h2>
                    <p>${getProduct[i].color}</p>
                    <p>${productPrice} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p class="quantity">Qté : ${getProduct[i].quantity}</p>
                      <input type="number" class="itemQuantity" id="${i}" name="itemQuantity" min="1" max="100" value="${getProduct[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              `


    // Injection du code dans la balise HTML prévu à cet effet
    productCard.innerHTML = display;

  }

  /**
   * Récupération des boutons supprimer
   * @type {Array}
   */
  let deleteItem = Array.from(document.querySelectorAll('.deleteItem'));

  /**
   * Tableau qui va contenir les produits après la supression du produit sélectionné
   * @type {Array}
   */
  let del = [];
  console.log(deleteItem)

  // supprimer element
  for (let i = 0; i < deleteItem.length; i++) {

    deleteItem[i].addEventListener('click', () => {

      deleteItem[i].parentElement.style.display = "none";


      del = getProduct;
      del.splice([i], 1);
      console.log(del)
      console.log(getProduct)

      getProduct = localStorage.setItem('produit', JSON.stringify(del));

      window.location.href = "cart.html";

    });

  };

  console.log(getProduct)


  /**
   * Récupération des inputs qui vont modifier la quantité
   * @type {Array}
   */
  let changeValue = document.querySelectorAll(".itemQuantity");

  /**
 * Création d'un tableau qui va récupérer toutes les quantités
 * @type {Array}
 */
  const totalQuantity = [];

  /**
   *  Création d'un tableau qui va récupérer tous les prix
   * @type {Array}
   */
  const totalPrice = [];

  for (let m = 0; m < changeValue.length; m++) {

    // Sélectionne la balise à coté de l'input pour 
    const productPrice = urlData.find((el) => el.name === getProduct[m].name).price
    console.log(productPrice)
    const quantityOutput = document.getElementsByClassName("quantity")[m];

    // Ajout des prix dans le tableau
    /**
     * Création d'une constante qui récupère le bon prix du produit dans le tableau de la promise
     * @type {number}
     */

    let price = productPrice * getProduct[m].quantity;

    totalPrice.push(price);
/**
 * @function reduce prend tous les prix du tableau, les additionne pour retourner une seule valeur
 * @type {number}
 */

    let finalPrice = totalPrice.reduce((accumulator, price) => {
      return accumulator + price
    }, 0);


    document.getElementById("totalPrice").innerText = finalPrice;

    // Ajout des quantités dans le tableau totalQuantity
    let productQuantity = parseInt(getProduct[m].quantity);
    totalQuantity.push(productQuantity);
    let finalQuantity = totalQuantity.reduce((accumulator, productQuantity) => {
      return accumulator + productQuantity
    }, 0);


    document.getElementById("totalQuantity").innerText = finalQuantity;

    // L'événement change est déclenché pour les éléments <input> lorsqu'un changement de leur valeur est réalisé par l'utilisateur.
    changeValue[m].addEventListener("change", (e) => {
      e.preventDefault();

      /**
       * Séléctionne la valeur inscrit dans l'input et lui attribue une variable ici qty.
       * @type {number}
       */
      const currentQuantity = document.getElementsByName("itemQuantity")[m].value;
      let qty = currentQuantity;
      console.log(qty);

      // Ajout de la nouvelle quantité dans le tableau totalQuantity

      totalQuantity.splice(m, 1, parseInt(qty));

      // Ici, la quantité inscrite dans l'input du navigateur est égale a celle trouvée dans saveProduct 
      getProduct[m].quantity = qty;
      console.log(getProduct[m].quantity)
      productQuantity[m] = qty;
      finalQuantity = totalQuantity.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0);


      document.getElementById("totalQuantity").innerText = finalQuantity;

      // Modifie la quantité affichée à coté de l'input

      quantityOutput.innerText = `Qté : ${qty}`

      console.log(getProduct)

      //Modification du tableau getProduct pour pouvoir envoyer la nouvelle quantité dans le localStorage
      getProduct.splice(m, 1, getProduct[m])

      //Envoie du tableau getProduct actualisé dans le localStorage
      localStorage.setItem("produit", JSON.stringify(getProduct))

      // Calcul du prix en fonction de la quantité choisie

      let newPrice = productPrice * qty;
      console.log(newPrice);

      //Modification du tableau des prix en remplaçant l'ancien prix par le nouveau
      totalPrice.splice(m, 1, newPrice);
      console.log(totalPrice);

      finalPrice = totalPrice.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0);

      document.getElementById("totalPrice").innerText = finalPrice;
      console.log(newPrice);
      console.log(qty);

      // Ici, le prix inscrit dans l'input du navigateur est égale a celui trouvé dans saveProduct 
      urlData.price = newPrice;
      console.log(urlData.price);



    });
  }

}

cartDisplay();
console.log(getProduct)

const commandButton = document.getElementById("order");
commandButton.addEventListener("click", (Event) => {
  Event.preventDefault();

  /**
   * Création d'un objet qui va récuperer les valeaurs du formulaire
   * @type {{firstName: string, lastName: string, address: string, city: string, email: string}}
   */
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  }

  // Validation du formulaire

  // Ne pas valider le formulaire s'il est vide



  // création de la variable qui testera la validité du prénom, du nom et de la ville


  let stringRegExp = new RegExp('^[A-Za-zé]{3,30}$');

  // création de la variable qui testera la validité de l'adresse

  let addressRegExp = new RegExp('^[a-zA-Z0-9 + \s]{3,70}$');

  // création de la variable qui testera la validité de l'email

  let emailRegExp = new RegExp('^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$');
  console.log(emailRegExp);

  // Création de la const pour le prénom 

  const firstName = contact.firstName;

  // Création de la const pour le nom

  const lastName = contact.lastName;

  // Création de la const pour l'adresse
  const address = contact.address;

  // Création de la const pour la ville

  const city = contact.city;

  // Création de la const pour l'email

  const email = contact.email;

  // Controle des données en utilisant les variables regexp
  let validFirstName = stringRegExp.test(firstName);
  console.log(validFirstName);
  let validLastName = stringRegExp.test(lastName);
  console.log(validLastName);
  let validAddress = addressRegExp.test(address);
  console.log(validAddress);
  let validCity = stringRegExp.test(city);
  console.log(validCity);
  let validEmail = emailRegExp.test(email);
  console.log(validEmail);

  const errorFirstName = document.getElementById("firstNameErrorMsg")
  if (validFirstName == false) {
    // Message d'alerte pour le prénom
    ;
    errorFirstName.innerText = "le prénom n'est pas valide";
  } else {
    errorFirstName.innerText = "";
  }

  const errorLastName = document.getElementById("lastNameErrorMsg");
  if (validLastName == false) {
    // Messsage d'alerte pour le nom

    errorLastName.innerText = "Le nom n'est pas valide";
  } else {
    errorLastName.innerText = "";
  }

  const errorAddress = document.getElementById("addressErrorMsg");
  if (validAddress == false) {
    // Message d'alerte pour l'adresse

    errorAddress.innerText = "l'adresse n'est pas valide";
  } else {
    errorAddress.innerText = "";
  }

  const errorCity = document.getElementById("cityErrorMsg");
  if (validCity == false) {
    // Message d'alerte pour la ville
    errorCity.innerText = "la ville n'est pas valide";
  } else {
    errorCity.innerText = "";
  }

  const errorEmail = document.getElementById("emailErrorMsg");
  if (validEmail == false) {
    // Message d'alerte pour l'email
    errorEmail.innerText = "l'email n'est pas valide";
  } else {
    errorEmail.innerText = ""
  }



  // Condition : si le formulaire est bien remplie, envoyer les donnnées dans l'api. Sinon, ne pas envoyer les données et afficher un message d'alerte
  // si les valeurs sont valides, envoyer les valeurs dans l'api'

  if (validFirstName == true && validLastName == true && validAddress == true && validCity == true && validEmail == true) {
    console.log("formulaire");

    console.log(contact)

    /**
     * Création d'un tableau vide qui va récupèrer l'id de tous les produits présents dans le panier
     * @type {Array}
     */
    let productId = [];

    //Création de la boucle qui va récupèrer tous les ids du tableau getProduct
    for (i = 0; i < getProduct.length; i++) {
      console.log(getProduct[i].id)

      //Récupère les ids du tableau getProduct pour les ajouté au tableau productId
      productId.push(getProduct[i].id)

    }
    console.log(productId)

    /**
     * Envoyer les données du formulaire et l'id de chaque produits dans l'api au format JSON
     * @type {Promise<{contact: {firstName: String, lastName: String, address: String, city: String, email: String} products: String}>}
     */
    const postResults = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({
        contact: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          address: contact.address,
          city: contact.city,
          email: contact.email
        },
        products: productId
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
    console.log("Récupération des résultats");
    console.log(postResults);

    //Récupérer le résultat envoyé par l'api
    postResults.then(async (response) => {
      try {
        console.log(response);
        const content = await response.json();
        console.log(content);

        /**
         *  Récupération de l'id de la reponse du serveur
         *  @type {string}
         */
        const id = content.orderId
        console.log("id de la réponse");
        console.log(id)

        // Aller dans la page confirmation
        window.location.href = `./confirmation.html?id=${id}`

      } catch (e) {
        alert("erreur")
      }
    })

  } else {
    alert("Veuillez bien remplir le formulaire");
  }
})