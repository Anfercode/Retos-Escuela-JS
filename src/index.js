var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

const fetchDataPromise = url_api => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function(event) {
      if (xhttp.readyState === 4 && xhttp.status == 200)
        resolve(xhttp.responseText);
      else return reject(url_api);
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};

fetchDataPromise(API)
  .then(
    (firstCall = data1 => {
      console.log("Primer Llamado...");
      parcedData1 = JSON.parse(data1);
      return fetchDataPromise(API + parcedData1.results[0].id);
    })
  )
  .then(
    (secondCall = data2 => {
      console.log("Segundo Llamado...");
      parcedData2 = JSON.parse(data2);
      return fetchDataPromise(parcedData2.origin.url);
    })
  )
  .then(
    (thirdCall = data3 => {
      parcedData3 = JSON.parse(data3);
      console.log("Tercero Llamado...");
      console.log("Personajes:" + " " + parcedData1.info.count);
      console.log("Primer Personaje:" + " " + parcedData2.name);
      console.log("Dimensión:" + " " + parcedData3.dimension);
    })
  )
  .catch();
