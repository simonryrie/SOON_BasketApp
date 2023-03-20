//Commented out - delete comments to run tests //

/*

test('Test adding to item count', () => {
  // Set up the initial state
  document.getElementById("numberToAdd").textContent = "1";
  const button = { textContent: "+" };
  const stock = 10;

  // Trigger the function
  changeNumberToAdd(button, stock);

  // Check the result
  const numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
  equal(numberToAdd, 2, 'Item count should increase to 2 after clicking plus button');
});

test('Test subtracting from item count', () => {
  // Set up the initial state
  document.getElementById("numberToAdd").textContent = "2";
  const button = { textContent: "—" };
  const stock = 10;

  // Trigger the function
  changeNumberToAdd(button, stock);

  // Check the result
  const numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
  equal(numberToAdd, 1, 'Item count should decrease to 1 after clicking minus button');
});

test('Test item count cannot go below 1', () => {
  // Set up the initial state
  document.getElementById("numberToAdd").textContent = "1";
  const button = { textContent: "—" };
  const stock = 10;

  // Trigger the function
  changeNumberToAdd(button, stock);

  // Check the result
  const numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
  equal(numberToAdd, 1, 'Item count should not go below 1');
});

test('Test item count cannot go above stock', () => {
  // Set up the initial state
  document.getElementById("numberToAdd").textContent = "10";
  const button = { textContent: "+" };
  const stock = 10;

  // Trigger the function
  changeNumberToAdd(button, stock);

  // Check the result
  const numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
  equal(numberToAdd, 10, 'Item count should not go above stock');
});

*/