window.onload = () => {
    updatePageTitle();
    addEventListeners();
};

function addEventListeners() {
    const plusOrMinusButtons = document.getElementsByClassName("plus-minus");
    for (let i = 0; i < plusOrMinusButtons.length; i++) {
      plusOrMinusButtons[i].addEventListener("click", function() {
        changeNumberToAdd(this);
      });
    }
}

  
function updatePageTitle() {
    const itemName = document.getElementById("itemName").textContent;
    document.getElementById("title").textContent = itemName;
};

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

