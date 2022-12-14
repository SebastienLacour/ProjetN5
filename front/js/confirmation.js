// Récupération de l'id pour l'afficher 
let params = new URL(document.location).searchParams;
const id = params.get("id");

console.log(params);
console.log(id);

// Récupération de l'élément où sera injecté le numéro de commande
const idDisplay = async() => {

    const orderId = document.getElementById("orderId");

    orderId.innerText = id;
    console.log(orderId);
    localStorage.removeItem("produit")
}

idDisplay();



