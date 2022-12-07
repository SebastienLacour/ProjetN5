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
console.log(fetchProduct);



// Création d'une fonction qui affichera les produits de l'api dans la page d'accueil

const itemsDisplay = async() => {
  await fetchProduct();

    // Création de la variable qui contient le code pour afficher les éléments de chaque produit sur la page d'accueil
    let display = ""

    // Création d'une boucle pour afficher tous les items de la liste de la page d'accueil
    for (let i = 0; i < urlData.length; i++) {

      // Récupération de la balise html où injecter le code
      const items = document.getElementById("items");

      // Remplissage de la variable 'display' avec le code pour afficher chaque produit
       display = display + `<a href="./product.html?id=${urlData[i]._id}">
      <article>
        <img src="${urlData[i].imageUrl}" alt="${urlData[i].altTxt}">
        <h3 class="productName">${urlData[i].name}</h3>
        <p class="productDescription">${urlData[i].description}</p>
      </article>
     </a>`

     // Injection du code dans la balise HTML
     items.innerHTML = display;
  
}
}




itemsDisplay(urlData);
console.log(itemsDisplay)