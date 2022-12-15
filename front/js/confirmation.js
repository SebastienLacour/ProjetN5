// Récupération de l'id pour l'afficher 
let params = new URL(document.location).searchParams;
const id = params.get("id");

console.log(params);
console.log(id);

    // Récupération de l'élément où sera injecté le numéro de commande
    const orderId = document.getElementById("orderId");

    //Injection de l'id de l'url dans la balise dédiée
    orderId.innerText = id;
    console.log(orderId);

    //Supprime les valeurs du localstorage
    localStorage.removeItem("produit")




