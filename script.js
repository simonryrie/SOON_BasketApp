// functions to be carried out on load

window.onload = () => {
    updatePageTitle();
    addEventListeners();
};

// declare basket (local storage functionality added later)

let basket = {
}

// function to add all event listeners

function addEventListeners() {
    // plus or minus buttons
    const plusOrMinusButtons = document.getElementsByClassName("plus-minus");
    for (let i = 0; i < plusOrMinusButtons.length; i++) {
      plusOrMinusButtons[i].addEventListener("click", function() {
        changeNumberToAdd(this);
      });
    }
    // add to basket button
    const addToBasketButton = document.getElementById("addToBasket");
    addToBasketButton.addEventListener("click", addToBasket);
}

// function to update the page title based on the item's name

function updatePageTitle() {
    const itemName = document.getElementById("itemName").textContent;
    document.getElementById("title").textContent = itemName;
};

// function to increment the number of items to add

function changeNumberToAdd(button) {
    let numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
    const numberInStockText = document.getElementById("numberInStock").textContent;
    const numberInStock = parseInt(numberInStockText.match(/\d+/)[0]);
    if (button.textContent == "+") {
        if (numberToAdd < numberInStock) {
            numberToAdd++;
        }
    } else if (button.textContent == "—") {
        if (numberToAdd > 1) {
            numberToAdd--;
        }
    }
    document.getElementById("numberToAdd").textContent = numberToAdd;
}

// function to add items to basket

function addToBasket() {
    const itemName = document.getElementById("itemName").textContent;
    let numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
    const numberInStockText = document.getElementById("numberInStock").textContent;
    const numberInStock = parseInt(numberInStockText.match(/\d+/)[0]);
    
    if (basket[itemName]) {
        const totalNumber = basket[itemName] + numberToAdd;
        if (totalNumber > numberInStock) {
            numberToAdd = numberInStock - basket[itemName];
        }
        basket[itemName] += numberToAdd;
    } else {
        if (numberToAdd > numberInStock) {
            numberToAdd = numberInStock;
        }
        basket[itemName] = numberToAdd; 
    }
    
    document.getElementById("numberToAdd").textContent = 1;

    updateBasketTotal();
}

// function to update total items in basket

function updateBasketTotal() {
    const arrayOfItemNumbers = Object.values(basket);
    const basketTotal = arrayOfItemNumbers.reduce((sum, current) => sum + current, 0);
    const basketCounter = document.getElementById("amountInBasket");
    basketCounter.textContent = basketTotal;
    animateBasket();
}

// function to highlight basket with colour change on submission

function animateBasket() {
    const basketCounter = document.getElementById("amountInBasket");
    const accentColorOne = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color-one");
    const accentColorTwo = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color-two");
    basketCounter.animate([{backgroundColor: accentColorTwo}, {backgroundColor: accentColorOne}], {duration: 500, fill: "forwards"}).onfinish = function() {
    basketCounter.style.backgroundColor = accentColorOne;
  };
}