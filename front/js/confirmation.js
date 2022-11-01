// Récupération de l'id du localstorage

const responseId = localStorage.getItem("id de la réponse");
console.log(`id de la réponse :${responseId}`)

// Récupération de l'élément où sera injecté le numéro de commande

const orderId = document.getElementById("orderId");

// injection du numero de commande dans l'emplacement concu pour

orderId.innerText = responseId
console.log(orderId);

// Suppression des éléments du localstorage à l'aide d'une fonction

function removeItems(key) {
    localStorage.removeItem(key)
}

removeItems("product");
removeItems("formValue");
removeItems("id de la réponse");

// Retour à la page d'accueil en cas de réactualisation

if (responseId == null) {
    window.location.href = "./index.html";
}