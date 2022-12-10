// Création d'un tableau vide qui va récupérer les données enregistrées de la page produit pour les afficher dans la page panier
let getProduct = [];

const fetchProduct = async () => {
  await fetch("https://restapi.fr/api/kanap")
    .then((res) => res.json())
    .then((promise) => {
      // Ici on transfère la promesse le tableau saveProduct
      getProduct = promise;
      console.log(getProduct);
    })

    .catch((error) => console.error("Erreur = " + error));
}

fetchProduct()


// Création de la variable qui contendra le code pour afficher les différents produits dans la page panier

let newQuantity = [];

let price = [];

let display = [];


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
  // Si getProduct ne contient uniquement un objet
  if (getProduct.length == undefined) {
    display = `
        <article class="cart__item" data-id="${getProduct.id}" data-color="${getProduct.color}">
        <div class="cart__item__img">
          <img src="${getProduct.image}" alt="${getProduct.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${getProduct.name}</h2>
            <p>${getProduct.color}</p>
            <p>${getProduct.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p class="quantity">Qté : ${getProduct.quantity}</p>
              <input type="number" class="itemQuantity" id="${getProduct.quantity}" name="itemQuantity" min="1" max="100" value="${getProduct.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `

    productCard.innerHTML = display;

    // Suppression de l'élément 
    // Séléction du bouton supprimer
    const deleteItem = document.querySelector(".deleteItem");

    //On écoute le click du bouton
    deleteItem.addEventListener("click", (event) => {

      // On supprime l'élément de l'api grace à la méthode fetch "DELETE"
      const deleteProduct = fetch("https://restapi.fr/api/kanap", {
        method: "DELETE",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify(getProduct)
      })

      deleteProduct.then(async (response) => {
        try {
          console.log(response);
          const content = await response.json();
          content = JSON.parse(getProduct);
          console.log(content);
        } catch (e) {
          console.log("erreur")
        }
      })

      // On supprime l'afichage de l'élément 
      deleteItem.parentElement.style.display = "none";

      // On réactualise la page après le clic
      window.location.href = "./cart.html"
    })

    // Création d'un tableau qui va récupérer toutes les quantités
    let totalQuantity = [];


    // Création d'un tableau qui va récupérer tous les prix
    let totalPrice = [];

    totalQuantity = getProduct.quantity;
    document.getElementById("totalQuantity").innerText = totalQuantity;
    console.log(totalQuantity);

    totalPrice = getProduct.price
    document.getElementById("totalPrice").innerText = totalPrice;
    let changeValue = document.querySelector(".itemQuantity");

    const quantityOutput = document.querySelector(".quantity");

    changeValue.addEventListener("change", (e) => {
      e.preventDefault();

      const currentQuantity = document.querySelector(".itemQuantity").value;
      console.log(document.querySelector(".itemQuantity").value)
      let qty = currentQuantity;
      console.log(qty);

      quantityOutput.innerText = `Qté : ${qty}`;

      totalQuantity = qty;
      document.getElementById("totalQuantity").innerText = totalQuantity;

      let newPrice = getProduct.price * qty
      totalPrice = newPrice;
      document.getElementById("totalPrice").innerText = totalPrice;
    })
    

    // Si getProduct est un tableau de plusieurs objets
  } else {
    // Création d'une boucle 
    for (i = 0; i < getProduct.length; i++) {

      console.log(getProduct.length)

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
                    <p>${getProduct[i].price} €</p>
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

    };



    // Séléction des boutons supprimer

    const deleteItem = document.querySelectorAll(".deleteItem");
    let del = []

    // Création d'une boucle qui va permettre de supprimer le produit séléctionné par le bouton supprimer
    for (j = 0; j < deleteItem.length; j++) {

      // Création d'une constante qui va récupérer la balise de chaque produit affiché
      const productArticle = document.getElementsByClassName("cart__item");

      // Création d'une constante qui récupère la balise sélectionné par le bouton supprimer
      const productToDelete = productArticle[j];


      // Création d'une variable qui récupère l'id du produit séléctionné par le bouton supprimer
      let deleteId = getProduct[j].id;

      // Création d'un addeventListener qui va écouter le click du bouton supprimer du produit séléctionné
      deleteItem[j].addEventListener("click", (event) => {

        event.preventDefault();

        //Supression de l'élement sélectionné du tableau saveProduct
        del = getProduct.splice([j], 1)

        //Suppimer de l'affichage de la page l'élément sélectionné
        productToDelete.style.display = "none";


        // Création d'une fonction qui va enlever le produit séléctionné par le bouton supprimer de l'api fetch
        const deleteProduct = fetch("https://restapi.fr/api/kanap", {
          method: "DELETE",
          headers: { "Content-Type": "aplication/json" },
          body: JSON.stringify(getProduct[j])
        })
        console.log(deleteProduct);
        console.log(getProduct)


        deleteProduct.then(async (response) => {
          try {
            console.log(response);
            const content = await response.json();
            content = JSON.parse(getProduct);
            console.log(content);
          } catch (e) {
            console.log("erreur")
          }
        })

        window.location.href = "./cart.html"
      })




      let changeValue = document.querySelectorAll(".itemQuantity");

      // Création d'un tableau qui va récupérer toutes les quantités
      const totalQuantity = [];


      // Création d'un tableau qui va récupérer tous les prix
      const totalPrice = [];

      for (let m = 0; m < changeValue.length; m++) {

        // Sélectionne la balise à coté de l'input pour 

        const quantityOutput = document.getElementsByClassName("quantity")[m];

        // Ajout des prix dans le tableau

        let price = getProduct[m].price * getProduct[m].quantity;
        totalPrice.push(price);


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

          // Séléctionne la valeur inscrit dans l'input et lui attribue une variable ici qty.
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

          // Calcul du prix en fonction de la quantité choisie

          let newPrice = getProduct[m].price * qty;
          console.log(newPrice);

          totalPrice.splice(m, 1, newPrice);
          console.log(totalPrice);

          finalPrice = totalPrice.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          document.getElementById("totalPrice").innerText = finalPrice;
          console.log(newPrice);
          console.log(qty);

          // Ici, le prix inscrit dans l'input du navigateur est égale a celui trouvé dans saveProduct 
          getProduct.price = newPrice;
          console.log(getProduct.price);

          // Permet de savoir l'id du produit que l'on souhaite modifier dans l'input et egal au produit stocké dans le storage
          let product = getProduct.find(
            (dataProduct) => dataProduct.id === getProduct[m].id
          );



          if (qty <= 0 || qty > 100) {
            alert("Veuillez entrer un nombre compris entre 0 et 100");
            window.location.reload();
            return getProduct[m];
          }
          else {
            let finalProducts = {
              id: getProduct[m].id,
              image: getProduct[m].image,
              alt: getProduct[m].alt,
              name: getProduct[m].name,
              color: getProduct[m].color,
              price: newPrice,
              quantity: qty,
            }


            console.log(getProduct);

            let newSave = { finalProducts }

            newSave = fetch("https://restapi.fr/api/kanap", {
              method: "PUT",
              body: JSON.stringify(finalProducts),
              headers: {
                "Content-Type": "application/json"
              },
            })

            let newId = newSave.findIndex((Element) => Element.id == getProduct[m].id);

            let item = newSave[newId];
            item.quantity = qty
            item.price = newPrice

            newSave[newId] = item

            console.log(newId);

          }

        });
      }
    }
  }
}
cartDisplay();
console.log(getProduct)

const commandButton = document.getElementById("order");
commandButton.addEventListener("click", (Event) => {
  Event.preventDefault();
  const formValue = {
    prenom: document.getElementById("firstName").value,
    nom: document.getElementById("lastName").value,
    adresse: document.getElementById("address").value,
    ville: document.getElementById("city").value,
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



  // Condition : si le formulaire est bien remplie, envoyer les donnnées dans le localStorage. Sinon, ne pas envoyer les données et afficher un message d'alerte
  // si les valeurs sont valides, envoyer les valeurs dans le localstorage

  if (validFirstName == true && validLastName == true && validAddress == true && validCity == true && validEmail == true) {
    console.log("formulaire");
    console.log(formValue);

    const sent = {
      getProduct,
      formValue,
    }

    const postResults = fetch("https://restapi.fr/api/command", {
      method: "POST",
      body: JSON.stringify(sent),
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("Récupération des résultats");
    console.log(postResults);

    // Voir le résultat dans la console  

    postResults.then(async (response) => {
      try {
        console.log(response);
        const content = await response.json();
        console.log(content);

        // Récupération de l'id de la reponse du serveur

        console.log("id de la réponse");
        console.log(content._id);

        // Aller dans la page confirmation

        window.location.href = "./confirmation.html"

      } catch (e) {
        alert("erreur")
      }
    })

  } else {
    alert("Veuillez bien remplir le formulaire");
  }
}) 