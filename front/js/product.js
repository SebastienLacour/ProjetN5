// Récupere l'ID de chaque produit grâce à la methode searchParams qui permet de le récuperer directement dans l'URL
let params = new URL(document.location).searchParams;
const id = params.get("id");

console.log(params);
console.log(id);

// Nouveau tableau vide ou l'on stocke les données que va nous retourner la methode fetch en dessous.
let urlData = [];

console.log(urlData);


// Utilisation de la methode fetch() afin de recupérer les données via l'id produit tout en affichant l'id du produit dans l'url de la page pour pouvor afficher la page de tel produit

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

// Création d'une fonction qui affichera le produit séléctionné  dans la page produit 

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

// Récupération de l'id de la couleur
const idColor = document.getElementById("colors");

// Récupération de l'id de la quantité de produit'
const idQuantity = document.getElementById("quantity");

// Sauvegarder les données ajoutées par l'utilisateur en cliquant sur le bouton

// le bouton
const button = document.getElementById("addToCart");
console.log(button);

// Enregistrement des options au clic sur le bouton dans le localStorage
button.addEventListener("click", (event) => {

  // Ajout d'un preventDefault qui va empecher l'actualisation de la page au clic du bouton
  event.preventDefault();

  // Enregistrement de la couleur choisie
  const colorChoice = idColor.value;
  console.log(colorChoice);

  // Enregistrement de la quantité choisie
  const quantityChoice = idQuantity.value;
  console.log(quantityChoice);

  // Création d'un objet qui contient les différentes informations à enregistrer
  let productSetting = {
    id: urlData._id,
    image: urlData.imageUrl,
    alt: urlData.altTxt,
    name: urlData.name,
    color: colorChoice,
    price: urlData.price,
    quantity: quantityChoice,
  };

  console.log(productSetting);

    let saveProduct = fetch("https://restapi.fr/api/kanap", {
    method: "POST",
    body: JSON.stringify(productSetting),
    headers: {
      "Content-Type": "application/json"
    },
  }) 
  console.log(productSetting)

  
  window.location.href = "./cart.html"; 

}) 
