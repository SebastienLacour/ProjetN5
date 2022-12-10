// Récupération de l'id du localstorage

let getProduct = [];

const fetchProduct = async () => {
  await fetch("https://restapi.fr/api/kanap")
    .then((res) => res.json())
    .then((promise) => {
      // Ici on transfère la promesse le tableau saveProduct
      getProduct = promise;
      console.log(getProduct);
      console.log(getProduct._id)
    })

    .catch((error) => console.error("Erreur = " + error));
}

fetchProduct()

// Récupération de l'élément où sera injecté le numéro de commande
const idDisplay = async() => {
    await fetchProduct();
    let responseId = getProduct._id;
    console.log(responseId);

    const orderId = document.getElementById("orderId");

    orderId.innerText = responseId
    console.log(orderId);

    // Retour à la page d'accueil en cas de réactualisation
    if (responseId == null) {
        window.location.href = "./index.html";
    }
}

idDisplay();


// injection du numero de commande dans l'emplacement concu pour



// Suppression des éléments de l'api 

const deleteApi = fetch("https://restapi.fr/api/kanap", {
    method: "DELETE",
    headers: { "Content-Type": "aplication/json" },
    body: ""
  })



