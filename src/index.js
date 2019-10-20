var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
var xhttp = new XMLHttpRequest();

const fetchOrders = url_api => {
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

function randomTime() {
  MIN = 1;
  MAX = 8;
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN) * 1000;
}

function randomTable() {
  MIN = 0;
  MAX = 3;
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
}

onError = error => {
  console.log(error);
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

async function waiter3() {
  const random = randomTime();

  try {
    await Promise.all([
      orders(random, menu.hotdog, table[1]).then(res => console.log(res)),
      orders(random, menu.pizza, table[1]).then(res => console.log(res)),
      orders(random, menu.hamburger, table[1]).then(res => console.log(res))
    ]);
  } catch (error) {
    onError(error);
  }
}

async function waiter4() {
  const time = randomTime();
  try {
    const promises = await Promise.all([
      fetchOrders(API).then(
        (callOrder = menu => {
          return (parcedData = JSON.parse(menu).data);
        })
      ),
      fetchOrders(API).then(
        (callOrder = menu => {
          return (parcedData = JSON.parse(menu).data);
        })
      ),
      fetchOrders(API).then(
        (callOrder = menu => {
          return (parcedData = JSON.parse(menu).data);
        })
      ),
      fetchOrders(API).then(
        (callOrder = menu => {
          return (parcedData = JSON.parse(menu).data);
        })
      )
    ]);

    await Promise.all([
      orders(time, promises[0], table[randomTable()]).then(res =>
        console.log(res)
      ),
      orders(time, promises[1], table[randomTable()]).then(res =>
        console.log(res)
      ),
      orders(time, promises[2], table[randomTable()]).then(res =>
        console.log(res)
      ),
      orders(time, promises[3], table[randomTable()]).then(res =>
        console.log(res)
      )
    ]);
  } catch (error) {
    onError(error);
  }
}

waiter();
waiter2();
waiter3();
waiter4();
