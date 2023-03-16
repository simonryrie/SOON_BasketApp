

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

deleteAllCookies()


let item1234 = {
    name : "Waxed Cotton Hooded Jacket",
    description : "The Drumming jacket in orange is finished with a water-repellent dry wax treatment that creates a love-worn look. It's made in the United Kingdom using organic cotton ripstop with a drawstring hood, underarm eyelets and buttoned flap front pockets. Shoulder epaulettes add a utilitarian twist, while a fly-fronted zip and snap-button closure keeps the overall look streamlined. Attach one of the collection's padded liners to the internal tab on cooler days.",
    price : 650,
    stock : 10,
    photo : "/Assets/Images/mackintosh-drumming-orange-dry-waxed-cotton-hooded-jacket-gmm-200_15481794_30254686_1000.png"
};

// functions to be carried out on page load

window.onload = () => {
    updatePage(item1234);
    addEventListeners();
    displayBasketTotal();
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
};

// function to format price for display

function formatPrice(amount) {
    const price = Number.parseFloat(amount).toFixed(2);
    return `£${price}`;
};

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

// function to ensure basket total is displayed from cookies on load

function displayBasketTotal() {
    let basket = JSON.parse(getCookie("basket"));
    if (!basket) {
        basket = {};
    }
    const arrayOfItemNumbers = Object.values(basket);
    const basketTotal = arrayOfItemNumbers.reduce((sum, current) => sum + current, 0);
    const basketCounter = document.getElementById("amountInBasket");
    basketCounter.textContent = basketTotal;
}

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
};

// function to add items to basket

function addToBasket() {
    const itemName = item1234.name;
    let numberToAdd = parseInt(document.getElementById("numberToAdd").textContent);
    const numberInStock = item1234.stock;
    
    let basket = JSON.parse(getCookie("basket"));
    if (!basket) {
        basket = {};
    }
    
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
    
    setCookie("basket", JSON.stringify(basket), 365);
    document.getElementById("numberToAdd").textContent = 1;
    updateBasketTotal();
};

// function to update the basket total

function updateBasketTotal() {
    let basket = JSON.parse(getCookie("basket"));
    if (!basket) {
        basket = {};
    }
    const arrayOfItemNumbers = Object.values(basket);
    const basketTotal = arrayOfItemNumbers.reduce((sum, current) => sum + current, 0);
    const basketCounter = document.getElementById("amountInBasket");
    const previousBasketTotal = parseInt(basketCounter.textContent);
    basketCounter.textContent = basketTotal;
    if (basketTotal > previousBasketTotal) {
        animateBasket("success");
    } else {
        animateBasket("fail");
    }
};

// cookies set and get functions

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}


// function to highlight basket with colour change on submission - red if no more items can be added

function animateBasket(successCheck) {
    const basketCounter = document.getElementById("amountInBasket");
    const accentColorOne = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color-one");
    const accentColorTwo = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color-two");
    const accentColorThree = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color-three");
    
    function animate(color) {
        basketCounter.animate([{backgroundColor: color}, {backgroundColor: accentColorOne}], {duration: 500, fill: "forwards"}).onfinish = function() {
            basketCounter.style.backgroundColor = accentColorOne;
        };
    };

    if(successCheck === "success") {
        animate(accentColorTwo)
    } else {
        animate(accentColorThree)
    };
};