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




const itemsDisplay = async() => {
  await fetchProduct();
  // Création d'une boucle pour afficher tous les items de la liste de la page d'accueil
    let display = ""
    for (let i = 0; i < urlData.length; i++) {



      const items = document.getElementById("items");
       display = display + `<a href="./product.html?id=${urlData[i]._id}">
      <article>
        <img src="${urlData[i].imageUrl}" alt="${urlData[i].altTxt}">
        <h3 class="productName">${urlData[i].name}</h3>
        <p class="productDescription">${urlData[i].description}</p>
      </article>
     </a>`

     items.innerHTML = display;

        

      /*`<a href="./product.html?${urlData[0]._id}">
        <article>
          <img src="${urlData[0].imageUrl}" alt="${urlData[0].altTxt}">
          <h3 class="productName">${urlData[0].name}</h3>
          <p class="productDescription">${urlData[0].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[1]._id}">
        <article>
          <img src="${urlData[1].imageUrl}" alt="${urlData[1].altTxt}">
          <h3 class="productName">${urlData[1].name}</h3>
          <p class="productDescription">${urlData[1].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[2]._id}">
        <article>
          <img src="${urlData[2].imageUrl}" alt="${urlData[2].altTxt}">
          <h3 class="productName">${urlData[2].name}</h3>
          <p class="productDescription">${urlData[2].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[3]._id}">
        <article>
          <img src="${urlData[3].imageUrl}" alt="${urlData[3].altTxt}">
          <h3 class="productName">${urlData[3].name}</h3>
          <p class="productDescription">${urlData[3].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[4]._id}">
        <article>
          <img src="${urlData[4].imageUrl}" alt="${urlData[4].altTxt}">
          <h3 class="productName">${urlData[4].name}</h3>
          <p class="productDescription">${urlData[4].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[5]._id}">
        <article>
          <img src="${urlData[5].imageUrl}" alt="${urlData[5].altTxt}">
          <h3 class="productName">${urlData[5].name}</h3>
          <p class="productDescription">${urlData[5].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[6]._id}">
        <article>
          <img src="${urlData[6].imageUrl}" alt="${urlData[6].altTxt}">
          <h3 class="productName">${urlData[6].name}</h3>
          <p class="productDescription">${urlData[6].description}</p>
        </article>
      </a>
      
      <a href="./product.html?${urlData[7]._id}">
        <article>
          <img src="${urlData[7].imageUrl}" alt="${urlData[7].altTxt}">
          <h3 class="productName">${urlData[7].name}</h3>
          <p class="productDescription">${urlData[7].description}</p>
        </article>
      </a>`

      /*const link = document.createElement("a");
      link.href = "./html.product?urlData[i]._id";
      link.alt = urlData[i].altTxt;

      const productCard = document.createElement("article");

      const itemImage = document.createElement("img");
      itemImage.src = urlData[i].imageUrl;
      itemImage.alt = urlData[i].altTxt;

      const itemName = document.createElement("h3");
      itemName.innerText = urlData[i].name;
      itemName.classList.add("productName")


      const itemDescription = document.createElement("p");
      itemDescription.innerText = urlData[i].description;
      itemDescription.classList.add("productDescription");

      productCard.append(itemImage, itemName, itemDescription);
      link.append(productCard);
      items.append(link); */
  
}
}




itemsDisplay(urlData);
console.log(itemsDisplay)