let item1234 = {
    name : "Waxed Cotton Hooded Jacket",
    description : "The Drumming jacket in orange is finished with a water-repellent dry wax treatment that creates a love-worn look. It's made in the United Kingdom using organic cotton ripstop with a drawstring hood, underarm eyelets and buttoned flap front pockets. Shoulder epaulettes add a utilitarian twist, while a fly-fronted zip and snap-button closure keeps the overall look streamlined. Attach one of the collection's padded liners to the internal tab on cooler days.",
    price : 650,
    stock : 10,
    photo : "/Assets/Images/mackintosh-drumming-orange-dry-waxed-cotton-hooded-jacket-gmm-200_15481794_30254686_1000.png"
}

// functions to be carried out on page load

window.onload = () => {
    updatePage(item1234);
    addEventListeners();
};

// declare basket (local storage functionality added later)

let basket = {};

// function to add all event listeners

function addEventListeners() {
    // plus or minus buttons
    const plusOrMinusButtons = document.getElementsByClassName("plus-minus");
    const stock = item1234.stock;
    for (let i = 0; i < plusOrMinusButtons.length; i++) {
        plusOrMinusButtons[i].addEventListener("click", function() {
        changeNumberToAdd(this, stock);
      });
    }
    // add to basket button
    const addToBasketButton = document.getElementById("addToBasket");
    addToBasketButton.addEventListener("click", addToBasket);
}

// function to format price for display

function formatPrice(amount) {
    const price = Number.parseFloat(amount).toFixed(2);
    return `£${price}`;
}

// function to update the page title based on the item's name

function updatePage(item) {
    const itemName = item.name;
    const itemDescription = item.description;
    const itemPrice = formatPrice(item.price);
    const stock = `${item.stock} in stock`;
    const photoURL = item.photo;
    document.getElementById("itemPhoto").src = photoURL;
    document.getElementById("title").textContent = itemName;
    document.getElementById("itemName").textContent = itemName;
    document.getElementById("description").textContent = itemDescription;
    document.getElementById("price").textContent = itemPrice;
    document.getElementById("numberInStock").textContent = stock;
};

// function to increment the number of items to add

function changeNumberToAdd(button, stock) {
    let numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
    if (button.textContent == "+") {
        if (numberToAdd < stock) {
            numberToAdd++;
        };
    } else if (button.textContent == "—") {
        if (numberToAdd > 1) {
            numberToAdd--;
        };
    }
    document.getElementById("numberToAdd").textContent = numberToAdd;
}

// function to add items to basket

function addToBasket() {
    const itemName = item1234.name;
    let numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
    const numberInStock = item1234.stock;
    
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