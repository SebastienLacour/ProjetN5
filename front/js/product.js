// Récupere l'ID de chaque produit grâce à la methode searchParams qui permet de le récuperer directement dans l'URL
let params = new URL(document.location).searchParams;
const id = params.get("id");

console.log(params);
console.log(id);

/**
 *  Nouveau tableau vide ou l'on stocke les données que va nous retourner la methode fetch en dessous.
 * @type {Array}
 */
let urlData = [];
console.log(urlData);


/**
 * Utilisation de la methode fetch() afin de recupérer les données via l'id produit tout en affichant l'id du produit dans l'url de la page pour pouvor afficher la page de tel produit
 * @return {Promise<{altTxt: string, colors: string[], description: string, imageUrl: string, name: string, price: number, _id: string}[]>}
 */
const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/` + id)
    .then((res) => res.json())
    .then((promise) => {
      // Ici on transfère la promesse le tableau urlData
      urlData = promise;
      console.log(urlData)
    })
    .catch((error) => console.error("Erreur = " + error));

};
fetchProduct();
console.log(fetchProduct);


/**
 * Création d'une fonction qui affichera le produit séléctionné  dans la page produit
 * @async
 */
const productDisplay = async () => {
  await fetchProduct();

  // On modifie les différentes infos du produits en utilisant le tableau urlData et ses valeurs

  // image
  const image = document.querySelector(".item__img");
  image.innerHTML = `<img src="${urlData.imageUrl}" alt="${urlData.altTxt}">`;

  // nom
  const name = document.getElementById("title");
  name.innerHTML = `${urlData.name}`;

  // prix
  const price = document.getElementById("price");
  price.innerHTML = `${urlData.price}`;

  // description du produit
  const description = document.getElementById("description");
  description.innerHTML = `${urlData.description}`;

  // Récupération de l'id pour afficher les couleurs du produit dans la lise déroulante prévue à cette effet
  const colorsContent = document.getElementById("colors");

  // Création de la variable qui contiendra le code pour afficher les couleurs
  let colors = ""

  // code pour afficher la valeur 'svp choisissez une couleur' dans la lise déroulante
  colors = colors + `<option value="">SVP, choisissez une couleur </option>`
  colorsContent.innerHTML = colors;

  // Création d'une boucle qui va afficher toutes les couleurs du produit dans la lise déroulante
  for (let i = 0; i < urlData.colors.length; i++) {

    // Code pour afficher les couleurs du produit dans la liste déroulante
    colors = colors + `<option id="option" value="${urlData.colors[i]}">${urlData.colors[i]}</option>`

    colorsContent.innerHTML = colors;
  }
}

productDisplay(urlData);
console.log(productDisplay);
/**
 * Récupération de l'id de la couleur du produit
 */
const idColor = document.getElementById("colors");

/**
 * Récupération de l'id de la quantité de produit
 */
const idQuantity = document.getElementById("quantity");

// Sauvegarder les données ajoutées par l'utilisateur en cliquant sur le bouton

// le bouton
const button = document.getElementById("addToCart");
console.log(button);

console.log("id")
console.log(id)
/**
 * Création d'un tableau qui va récupérer les valeurs du localStorage
 * @type {Array}
 */
let saveProduct = JSON.parse(localStorage.getItem("produit"))
console.log("valeur du localStorage avant l'ajout du produit")
console.log(saveProduct);


// Enregistrement des options au clic sur le bouton dans l'api
button.addEventListener("click", (event) => {

  // Ajout d'un preventDefault qui va empecher l'actualisation de la page au clic du bouton
  event.preventDefault();

  /**
   * Enregistrement de la couleur choisie
   * @type {string}
   */
  const colorChoice = idColor.value;
  console.log(colorChoice);

  /**
   * Enregistrement de la quantité choisie
   * @type {number}
   */
  let quantityChoice = idQuantity.value;
  console.log(quantityChoice);


  /**
   * Création d'un objet qui contient les différentes informations à enregistrer
   * @type {{id : string, image : string, alt : string, name : string, color : string, quantity : number}}
   */
  let productSetting = {
    id: urlData._id,
    image: urlData.imageUrl,
    alt: urlData.altTxt,
    name: urlData.name,
    color: colorChoice,
    quantity: quantityChoice,
  };

  console.log(productSetting);
  console.log("productSetting.id");
  console.log(productSetting.id);


  // Si quantité = 0 ou la couleur est non définie, envoyer une erreur et bloquer l'envoie du produit
  if (quantityChoice < 1 || colorChoice === "") {
    alert("Veuillez bien remplir les champs")

    //Si la quantité est supérieur à 0 et si une coulaur est choisie
  } else {

    // Si il y a déjà au moins un produit dans le localstorage
    if (saveProduct) {

      // Création d'une constante qui va vérifier si l'id du produit qu'on souhaite enregistré est déjà présent dans le localStorage
      const originalProduct = saveProduct.find(product => product.id === id)

      // Si l'id du produit sélectionné est déja présent dans le localStorage et si la couleur sélectionnée est déja présente dans le localStorage
      if (originalProduct && originalProduct.color === productSetting.color) {

        console.log(originalProduct.color);
        console.log(productSetting.color);


        //On met la jour la quantité du produit 
        productSetting.quantity = parseInt(productSetting.quantity) + parseInt(originalProduct.quantity)
        console.log(productSetting.quantity);


        //Création d'une constante qui va récupérer l'index du tableau saveProduct qu'on souhaite modifier avant d'envoyer au localStorage
        const originalProductIndex = saveProduct.findIndex(product => product.id === id)
        console.log(originalProductIndex);

        //On remplace l'ancienne valeur du produit par la nouvelle dans le tableau saveProduct
        saveProduct.splice(originalProductIndex, 1, productSetting)
        console.log(saveProduct)

        //On envoie le nouveau tableau dans le localStorage
        localStorage.setItem("produit", JSON.stringify(saveProduct));

        // Si l'id sélectionné n'est pas présent dans le localstorage ou si la couleur sélectionnée n'a pas encore été choisie
      } else {


        // On ajoute ce produit dans le tableau saveProduct
        saveProduct.push(productSetting);

        //On ajoute le nouveau tableau dans le localStorage
        localStorage.setItem("produit", JSON.stringify(saveProduct));
        console.log("produit ajouté au localStorage");
      }

      // S'il y a pas de prpduit dans le localStorage

    } else {

      //On transforme la variable saveProduct en tableau vide
      saveProduct = [];

      //On ajoute à ce tableau les valeaurs du produit sélectionné
      saveProduct.push(productSetting);

      //On ajoute le tableau dans le localStorage
      localStorage.setItem("produit", JSON.stringify(saveProduct));
      console.log(saveProduct);
    }



    window.location.href = "./cart.html";
  }
})
