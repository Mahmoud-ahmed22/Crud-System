let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productDescription = document.getElementById("productDescription");
let addButton = document.getElementById("add");
let table = document.getElementById("table");
let inputs = document.querySelectorAll("input");
let tableBody = document.getElementById("tableBody");
let productList;
let deletedIndex = 0;
let updateIndex = 0;
let nameTest = /^[A-Z][A-Za-z0-9]{4,}$/;
let priceTest = /^(100|[1-9][0-9]{2}|1000)$/;
let descriptionTest = /^[a-zA-z0-9]{20,}$/;

let setToLocalStorage = (productList) => {
    localStorage.setItem("productList", JSON.stringify(productList));
}

// Delete Elements

let deleteElement = () => {
    let deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach(function(e) {
    e.addEventListener('click', function() {
        deletedIndex = Array.from(deleteButton).indexOf(e);
        productList.splice(deletedIndex,1);
        setToLocalStorage(productList);
        display();
    })
})
}

// Update Element

let updateElement = () => {
    let updateButton = document.querySelectorAll(".update");
    updateButton.forEach(function(e) {
        e.addEventListener('click', function() {
            updateIndex = Array.from(updateButton).indexOf(e);
            productName.value = productList[updateIndex].prodName;
            productPrice.value = productList[updateIndex].prodPrice;
            productDescription.value = productList[updateIndex].prodDescription;
            addButton.innerHTML = "Update";
        })
    })
}

// Display ELements

let display = () => {
    tableBody.innerHTML = '';
    for (let i = 0; i < productList.length; i++) {
        let text = `<tr>
            <td>${productList[i].prodName}</td>
            <td>${productList[i].prodPrice}</td>
            <td>${productList[i].prodDescription}</td>
            <td><button class="btn btn-success update">Update</button></td>
            <td><button class="btn btn-danger delete">Delete</button></td>
        </tr>`;
            tableBody.innerHTML += text;
            deleteElement();
            updateElement();
    }
}

// Clear input form

let clearInput = () => {
    productName.value = '';
    productPrice.value = '';
    productDescription.value = '';
}


if (localStorage.getItem("productList") === null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("productList"));
}

display();

// Add Elements
let addItems = () => {
    // Test input
    let isValid = true;
    inputs.forEach(function(e) {    
        if (e === productName) {
            if (!(nameTest.test(e.value))) {
                isValid = false;
                e.classList.add('is-invalid');
            } else {
                e.classList.remove('is-invalid');
                e.classList.add('is-valid');
            }
        }
        if (e === productPrice) {
            if (!(priceTest.test(e.value))) {
                isValid = false;
                e.classList.add('is-invalid');
            } else {
                e.classList.remove('is-invalid');
                e.classList.add('is-valid');
            }
        }
        if (e === productDescription) {
            if (!(descriptionTest.test(e.value))) {
                isValid = false;
                e.classList.add('is-invalid');
            } else {
                e.classList.remove('is-invalid');
                e.classList.add('is-valid');
            }
        }
    })
    if (isValid === false) {
        return;
    } else {
        inputs.forEach(function(e) {
            e.classList.remove('is-valid');
            e.classList.remove('is-invalid');
        })
    }
    // Add
    if (addButton.innerHTML === "Update") {
        productList[updateIndex].prodName = productName.value;
        productList[updateIndex].prodPrice = productPrice.value;
        productList[updateIndex].prodDescription = productDescription.value;
        addButton.innerHTML = 'Add';
    } else {
        var products = {
            prodName: productName.value,
            prodPrice: productPrice.value,
            prodDescription: productDescription.value, 
        }
        productList.push(products);
    }
    setToLocalStorage(productList);
    display();
    clearInput();
    inputs.forEach(function(e) {
        e.classList.remove('is-valid');
    })
}
addButton.addEventListener('click', addItems);