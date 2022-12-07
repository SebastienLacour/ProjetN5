// Récupération de l'id du localstorage

const responseId = localStorage.getItem("id de la réponse");
console.log(`id de la réponse :${responseId}`)

// Récupération de l'élément où sera injecté le numéro de commande

const orderId = document.getElementById("orderId");

// injection du numero de commande dans l'emplacement concu pour

orderId.innerText = responseId
console.log(orderId);

// Suppression des éléments de l'api 

const deleteApi = fetch("https://restapi.fr/api/kanap", {
    method: "DELETE",
    headers: { "Content-Type": "aplication/json" },
    body: ""
  })

 //localStorage.removeItem("formValue");
 localStorage.removeItem("id de la réponse")
// Retour à la page d'accueil en cas de réactualisation

if (responseId == null) {
    window.location.href = "./index.html";
}