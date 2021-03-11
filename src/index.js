/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// console.log('Happy hacking :)')

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app"); // guardamos en una constante el nodo al que vamos a enviar lo tarido de la api
appNode.addEventListener("click", (evento) => {
  if (evento.target.nodeName === "H2") {
    window.alert("hola"); //creamos un evento que se escucha en el padre appnode pero solo se ejecuta el alert cuando hay click en el hijo h2
  }
});

// api internacionalización (intl) nos da formato a fechas y monedas
const formaPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
};

//web api
//conectamos al server
window
  .fetch(`${baseUrl}/api/avo`)
  //procesamos la respuesta y la convertimos a json
  .then((respuesta) => respuesta.json())
  //JSON -> data -> renderizar info in browser
  .then((responseJson) => {
    const allItems = [];
    responseJson.data.forEach((item) => {
      // crear titulo
      const title = document.createElement("h2");
      //llamamos del api el name
      title.textContent = item.name;

      // maneras de agregar style

      // title.style = 'font-size: 2rem';
      // title.style.fontSize = '30px';
      title.className = "text-xl sm:text-2xl font-medium text-center mt-4";

      //crear imagen
      const image = document.createElement("img");
      // llamamos la img del api
      image.src = `${baseUrl}${item.image}`;

      // crear precio
      const price = document.createElement("div");
      //traemos el precio del api
      price.textContent = formaPrice(item.price); //pasamos el precio por la fn para darle el formato que deseamos.
      price.className = "text-center font-bold mb-4";

      //creamos un contenedor para cada elemento
      const container = document.createElement("div");
      container.className =
        "cards w-full max-w-xs h-auto  my-6 sm:mx-2.5 shadow-md bg-white rounded-3xl transform transition duration-500 hover:scale-105";
      container.append(title, image, price);

      //agregamos los imtems al array
      allItems.push(container);
    });
    //creamos los nodos en el nodo de montaje #app
    appNode.append(...allItems);
    appNode.className = "flex flex-wrap justify-center";
  });
