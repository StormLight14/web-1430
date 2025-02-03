let inventory = [
  {
    "id": 0,
    "name": "Apple",
    "category": "Food",
    "quantity": 100,
    "price": 2.15
  },
  {
    "id": 1,
    "name": "Banana",
    "category": "Food",
    "quantity": 115,
    "price": 2.15
  },
  {
    "id": 2,
    "name": "Rock",
    "category": "Pet",
    "quantity": 1,
    "price": 999.99
  },
];

function addProduct(name, category, quantity, price) {
  if (price < 0.0 || quantity < 0) {
    console.log("price and quantity must be a positive number.");
    return;
  }

  inventory.push({
    "id": 3,
    "name": name,
    "category": category,
    "quantity": quantity,
    "price": price
  });
}

function removeProduct(id) {
  let startLength = inventory.length;
  inventory = inventory.filter((item) => item.id != id);
  if (startLength == inventory.length) {
    console.log(`No items with id '${id}' exist.`);
  }
}

function updateProductQuantity(id, newQuantity) {
  if (newQuantity < 0) {
    console.log("Item quantity must be a positive number.");
    return;
  }

  inventory.forEach((item) => {
    item.id == id ? item.quantity = newQuantity : "";
  });
}

function generateReport() {
  inventory.forEach((item) => {
    console.log(`\n${item.name}:\nID: ${item.id}, Quantity: ${item.quantity}, Category: ${item.category}, Price: ${item.price}`)
  })
}

function filterByCategory(category) {
  const result = category.filter((item) => item.category == category);
  if (result.length == 0) {
    console.log("Found no items in category " + category);
  }
  return result;
}

function calculateTotalInventoryValue() {
  console.log(inventory.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0));
}

addProduct("Paper", "Food", 1, 8378578537878578.25);
updateProductQuantity(3, 100);
removeProduct(3);
generateReport();
calculateTotalInventoryValue();
