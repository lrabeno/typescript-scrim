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

/* 
to make a property optional put a question mark before the colon like in name below
 type Pizza = {
     name?: string;
     price: number;
   };
*/

const menu: Array<Pizza> = [
  { id: 1, name: 'Margherita', price: 8 },
  { id: 2, name: 'Pepperoni', price: 10 },
  { id: 3, name: 'Hawaiian', price: 10 },
  { id: 4, name: 'Veggie', price: 9 },
];

let cashInRegister = 100;
let nextOrderId = 1;
const orderQueue: Array<Order> = [];

// can also define arrays like below
// const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Pizza): void {
  menu.push(pizzaObj);
}

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

export function getPizzaDetail(identifier: string | number): Pizza | undefined {
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

addNewPizza({ name: 'Chicken Bacon Ranch', price: 12 });
addNewPizza({ name: 'BBQ Chicken', price: 12 });
addNewPizza({ name: 'Spicy Sausage', price: 11 });

placeOrder('Chicken Bacon Ranch');
completeOrder(1);

console.log('Menu:', menu);
console.log('Cash in register:', cashInRegister);
console.log('Order queue:', orderQueue);
