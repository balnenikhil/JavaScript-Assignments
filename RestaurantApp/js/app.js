// rendering tables
function initTables() {
    loadTables();
}


function loadTables() {
    addTableItems(tableList);
}

function addTableItems(tableArray){
    const tableDiv = document.querySelector('#tables');
    tableArray.forEach(element => {
        tableDiv.appendChild(createTableItem(element));
    });
}

function createTableItem(table){

    const tableDiv = document.createElement('div');
    tableDiv.setAttribute('table-id', table.id);
    tableDiv.classList.add('card');
    tableDiv.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    tableDiv.addEventListener("drop", function (event) {
        event.preventDefault();
        const menuId = event.dataTransfer.getData('menu-id');
        const menuItem = getMenuItemById(menuId);

        addTableItem(menuItem,table);
        destroyTableItems();
        addTableItems(tableList);
    });

    tableDiv.addEventListener("click",()=>{
        document.querySelector(".bill-view").style.display="block";
        generateItems(table);
    });

    const h4Element = document.createElement('h4');
    h4Element.innerHTML = table.name;

    const totalCost = document.createElement('p');
    totalCost.innerHTML = "Rs. " + table.totalCost + " | Total items: " + table.totalItems;

    tableDiv.appendChild(h4Element);
    tableDiv.appendChild(totalCost);

    return tableDiv;

}


function destroyTableItems() {
    document.getElementById("tables").innerHTML="";
}

//searching tables

function processSearchTable() {
    const newTableArray = searchTable();

    destroyTableItems();
    addTableItems(newTableArray);
}

function searchTable(){

    const searchInput = document.querySelector('#table-search-input').value.toLowerCase();

    newTableList = tableList.filter((table) => {
        if (table.name.indexOf(searchInput) !== -1 ) {
            return true;
        }
        return false;
    });
    return newTableList;
}









//rendering menu items

function initMenu() {
    loadMenu();
}

function loadMenu() {
    addMenuItems(menuList);
}

function addMenuItems(menuArray) {
    const menuDiv = document.querySelector('#items');
    menuArray.forEach(item => {
        menuDiv.appendChild(createMenuItem(item));
    });
}

function createMenuItem(item){

    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('menu-id', item.id);
    containerDiv.classList.add('card');
    containerDiv.draggable = true;
    containerDiv.ondragstart = function (event) {
        event.dataTransfer.setData('menu-id', item.id);}

    const h4Element = document.createElement('h4');
    h4Element.innerHTML = item.name;

    const costElement = document.createElement('p');
    costElement.innerHTML = "Rs. " + item.cost;

    containerDiv.appendChild(h4Element);
    containerDiv.appendChild(costElement);

    return containerDiv;
}


function destroyMenuItems() {
    document.getElementById("items").innerHTML="";
}

//searching menu items

function processSearchMenu() {
    const newMenuArray = searchMenu();

    destroyMenuItems();
    addMenuItems(newMenuArray);
}

function searchMenu() {
    const searchInput = document.querySelector('#menu-search-input').value.toLowerCase();

    newMenuList = menuList.filter((menu) => {
        if (menu.name.indexOf(searchInput) !== -1 ||
            menu.type.indexOf(searchInput) !== -1) {
            return true;
        }
        return false;
    });
    return newMenuList;
}


// drag and drop functionality
// adding menuitems to table

function getMenuItemById(theId) {
    const newMenuList = menuList.filter((menu) => {
        if (menu.id == theId) {
            return true;
        }
        return false;
    });
    return newMenuList[0];
}

function findTableItem(theId,table) {
    let index;
    for (index = 0; index < table.cart.length; index++) {
        if (table.cart[index].menuItem.id == theId) {
            return index;
        }
    }
    return -1;
}



function addTableItem(menuItem, table) {
    const itemInTable = findTableItem(menuItem.id, table);
    if ( itemInTable!= -1) {
        table.cart[itemInTable].quantity += 1;
    } else {
        const item = {
            'menuItem': menuItem,
            'quantity': 1
        }
        table.cart.push(item);
        table.totalItems += 1;
    }
    table.totalCost += menuItem.cost;
}

//closing bill generator

function closeTableView(){
   document.querySelector(".bill-view").style.display="none";
   destroyTableItems();
   addTableItems(tableList);
}

//functionality in bill generator

function generateItems(theTable) {

    const tableNameContent = document.querySelector("#table-name");
    tableNameContent.innerHTML = theTable.name;

    const totalAmount = document.querySelector('#total-amount');
    const tableContent = document.querySelector('#cart-list');
    const billContent = document.querySelector('#generate-bill'); 


    tableContent.innerHTML='';
    billContent.innerHTML='';

    const generateBill = document.createElement('button');
    generateBill.classList.add("btn");
    generateBill.innerHTML='Generate Bill';

    generateBill.addEventListener('click',function(){
        resetTable(theTable);
        console.log(theTable);
        closeTableView();
        destroyTableItems();
        addTableItems(tableList);
    });

    billContent.appendChild(generateBill);

    let serialNo = 1;
    theTable.cart.forEach((item)=>{

        const newRow = document.createElement('tr');
        const serialNumber =document.createElement('td');
        const itemName = document.createElement('td');
        const itemPrice = document.createElement('td');
        const itemQuantity = document.createElement('td');
        const itemDelete = document.createElement('td');
        itemDelete.classList.add('cursor')

        const menuItem = item.menuItem;

        const quantityContent = getQuantityContent(theTable,menuItem.id,item.quantity);
        const deleteContent = getDeleteContent(theTable,menuItem.id);

        newRow.setAttribute('index',serialNo-1);

        serialNumber.innerHTML = serialNo;
        itemName.innerHTML = menuItem.name;
        itemPrice.innerHTML = menuItem.cost*item.quantity;
        itemQuantity.appendChild(quantityContent);
        itemDelete.appendChild(deleteContent);

        newRow.appendChild(serialNumber);
        newRow.appendChild(itemName);
        newRow.appendChild(itemPrice);
        newRow.appendChild(itemQuantity);
        newRow.appendChild(itemDelete);

        tableContent.appendChild(newRow);

        serialNo++;
    });

    totalAmount.innerHTML = theTable.totalCost;
}


function resetTable(theTable){
    if(theTable.totalCost != 0){
            alert("the total bill of the table is"+theTable.totalCost);
        }
    console.log(theTable.id);
    console.log(theTable.cart.length);
    theTable.cart = [];
    theTable.totalCost =0;
    theTable.totalItems =0;
    console.log(theTable.id);
    console.log(theTable.cart.length);
}

function getQuantityContent(theTable,theId,theQuantity){
    const span = document.createElement('span');
    const minus = document.createElement('img');
    minus.src = "icons/minus.png";
    minus.classList.add('cursor');
    minus.addEventListener('click',function(event){        
        removeItemFromTable(theId,theTable);
        generateItems(theTable);
    });
    
    const input = document.createElement('input');
    input.readOnly = true;
    input.name="quantity";
    input.value =theQuantity;
    input.type = 'number';
    input.classList.add('input');

    const plus = document.createElement('img');
    plus.src = "icons/plus.png";
    plus.classList.add('cursor');
    plus.addEventListener('click',function(event){
        increaseQuantity(theId,theTable);
        generateItems(theTable);
    });

    span.appendChild(minus);
    span.appendChild(input);
    span.appendChild(plus);

    return span;
}

function getDeleteContent(theTable,theId){

    const deleteImg = document.createElement('img');
    deleteImg.src = "icons/delete.png";

    deleteImg.addEventListener('click',function(event){
        deleteItemFromTable(theId,theTable)
        generateItems(theTable);
    });
    
    return deleteImg;
}

function removeItemFromTable(theId,theTable){
    const itemInTable = findTableItem(theId, theTable);
    if (itemInTable != -1) {
        theTable.totalCost -= theTable.cart[itemInTable]['menuItem'].cost;
        if (theTable.cart[itemInTable]['quantity'] == 1) {
            theTable.totalItems -= 1;
            theTable.cart.splice(itemInTable, 1);
        } else {
            theTable.cart[itemInTable]['quantity'] -= 1;
        }
    }
}

function deleteItemFromTable(theId,theTable){
    const itemInTable = findTableItem(theId, theTable);
    if (itemInTable != -1) {
        theTable.totalCost -= theTable.cart[itemInTable]['menuItem'].cost*theTable.cart[itemInTable]['quantity'];
        theTable.totalItems -= theTable.cart[itemInTable]['quantity'];
        theTable.cart.splice(itemInTable, 1);
    }
}

function increaseQuantity(theId,theTable){
    const itemInTable = findTableItem(theId, theTable);
            const menuItem = theTable.cart[itemInTable].menuItem;

            if ( itemInTable!= -1) {
                theTable.cart[itemInTable].quantity += 1;
            }
            theTable.totalCost += menuItem.cost;
}




