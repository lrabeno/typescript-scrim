type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: 'ordered' | 'completed';
};

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;

/* 
to make a property optional put a question mark before the colon like in name below
 type Pizza = {
     name?: string;
     price: number;
   };
*/

const menu: Array<Pizza> = [
  { id: nextPizzaId++, name: 'Margherita', price: 8 },
  { id: nextPizzaId++, name: 'Pepperoni', price: 10 },
  { id: nextPizzaId++, name: 'Hawaiian', price: 10 },
  { id: nextPizzaId++, name: 'Veggie', price: 9 },
];

const orderQueue: Array<Order> = [];

// can also define arrays like below
// const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Omit<Pizza, 'id'>): Pizza {
  // Create a newPizzaObj so we can call addNewPizza with the id omitted
  const newPizzaObj: Pizza = {
    id: nextPizzaId++,
    ...pizzaObj,
  };
  menu.push(newPizzaObj);
  return newPizzaObj;
}

addNewPizza({ name: 'Chicken Bacon Ranch', price: 12 });
addNewPizza({ name: 'BBQ Chicken', price: 12 });
addNewPizza({ name: 'Spicy Sausage', price: 11 });

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  // have to tell ts that the const newOrder is of the type Order, otherwise when we push ts will infer a string and give us a ts error
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: 'ordered',
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.log('order does not exist');
    return;
  }
  order.status = 'completed';
  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === 'string') {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else if (typeof identifier === 'number') {
    return menu.find((pizza) => pizza.id === identifier);
  } else {
    throw new TypeError(
      'Parameter `identifier` must be either a string or a number'
    );
  }
}

placeOrder('Chicken Bacon Ranch');
completeOrder(1);

console.log('Menu:', menu);
console.log('Cash in register:', cashInRegister);
console.log('Order queue:', orderQueue);
