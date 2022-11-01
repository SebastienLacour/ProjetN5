// Récupere l'ID de chaque produit grâce à la methode searchParams qui permet de le récuperer directement dans l'URL
let params = new URL(document.location).searchParams;
const id = params.get("id");

console.log(params);
console.log(id);

// Nouveau tableau vide ou l'on stocke les données que va nous retourner la methode fetch en dessous.
let urlData = [];

console.log(urlData);

// Utilisation de la methode fetch() afin de recupérer les données via l'id produit

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

const productDisplay = async () => {
  await fetchProduct();

  // On modifie les différentes infos produits en utilisant le tableau urlData et ses valeurs

  const image = document.querySelector(".item__img");
  image.innerHTML = `<img src="${urlData.imageUrl}" alt="${urlData.altTxt}">`

  const name = document.getElementById("title");
  name.innerHTML = `${urlData.name}`

  const price = document.getElementById("price");
  price.innerHTML =`${urlData.price}` ;

  const description = document.getElementById("description");
  description.innerHTML = `${urlData.description}`;

  const colorsContent = document.getElementById("colors");

  let colors = ""
  colors = colors + `<option value="">SVP, choisissez une couleur </option>`
  colorsContent.innerHTML = colors;

   for (let i = 0; i < urlData.colors.length; i++) {

  colors = colors + `<option id="option" value="${urlData.colors[i]}">${urlData.colors[i]}</option>`

  colorsContent.innerHTML = colors;
  }
}

productDisplay(urlData);
console.log(productDisplay);

// Séléction de la couleur

const idColor = document.getElementById("colors");

// Séléction de la quantité

const idQuantity = document.getElementById("quantity");

// Sauvegarder les données ajoutées par l'utilisateur en cliquant sur le bouton
// le bouton

const button = document.getElementById("addToCart");
console.log(button);

// Enregistrement des options au clic sur le bouton

button.addEventListener("click", (event) => {
  event.preventDefault();

  // Couleur

  const colorChoice = idColor.value;
  console.log(colorChoice);

  // Quantité

  // enregistrement dans le localStorage

  const quantityChoice =  idQuantity.value;
  console.log(quantityChoice);




  // Liste des paramètres du produit

   let productSetting = {
    id : urlData._id,
    image : urlData.imageUrl,
    alt : urlData.altTxt,
    name : urlData.name,
    color : colorChoice,
    price : urlData.price,
    quantity : quantityChoice,
  };

  console.log(productSetting);

   // Enregistrement dans le localStorage

   

   let saveProduct = JSON.parse(localStorage.getItem("product"));

   const addLocalstorage = () => {
    saveProduct.push(productSetting);
    localStorage.setItem("product", JSON.stringify(saveProduct));
  }

  console.log(addLocalstorage);
  
   if (saveProduct) {
 
    addLocalstorage();
 
   }else{
 
     saveProduct = [];
     addLocalstorage();
 
   } 

    window.location.href = "./cart.html";

  }) 
