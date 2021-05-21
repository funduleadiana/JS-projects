const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');


//Variables
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}


// Set localStorage Arrays
function updateSavedColumns() {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((name, i)=>{
        localStorage.setItem(`${name}Items`, JSON.stringify(listArrays[i]));
    })
//   localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
//   localStorage.setItem('progressItems', JSON.stringify(progressListArray));
//   localStorage.setItem('completeItems', JSON.stringify(completeListArray));
//   localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}


//Filter arrays to remove empty items
function filterArray(arr){
    const filteredArray = arr.filter(item => item !== null);
    return filteredArray;

}
// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
//   console.log('columnEl:', columnEl);
//   console.log('column:', column);
//   console.log('item:', item);
//   console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  //Set the id of each of our list el
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  //Apend
  columnEl.appendChild(listEl);

}


function updateDOM(){
    if(!updatedOnLoad){
        getSavedColumns();
    }
    backlogList.textContent = '';
    backlogListArray.forEach((backlogItem, index)=> {
        createItemEl(backlogList, 0, backlogItem, index);
    });
    backlogListArray =filterArray(backlogListArray);

    progressList.textContent = '';
    progressListArray.forEach((progressItem, index)=> {
        createItemEl(progressList, 1, progressItem, index);
    })
    progressListArray =filterArray(progressListArray)

    completeList.textContent = '';
    completeListArray.forEach((completeItem, index)=> {
        createItemEl(completeList, 2, completeItem, index);
    })
    completeListArray =filterArray(completeListArray)

    onHoldList.textContent = '';
    onHoldListArray.forEach((onHoldItem, index)=> {
        createItemEl(onHoldList, 3, onHoldItem, index);
    })
    onHoldListArray =filterArray(onHoldListArray)
    //Don't run more than once;
    updatedOnLoad = true;
    updateSavedColumns();
}

//Update column function
function updateItem(id, column){
    const selectedArray = listArrays[column];
    const selectedColumnEl = listColumns[column].children;
    if(!selectedColumnEl[id].textContent){
        delete selectedArray[id];
    }
    updateDOM();
}
//Add to column list
function addToColumn(col){
    const itemText = addItems[col].textContent;
    const selectedArray = listArrays[col];
    selectedArray.push(itemText);
    addItems[col].textContent = '';
    updateDOM();
}

//Show add item input box
function showInputBox(col){
    addBtns[col].style.visibility = 'hidden';
    saveItemBtns[col].style.display = 'flex';
    addItemContainers[col].style.display = 'flex';
}

//Hide item input box
function hideInputBox(col){
    addBtns[col].style.visibility = 'visible';
    saveItemBtns[col].style.display = 'none';
    addItemContainers[col].style.display = 'none';
    addToColumn(col);
}

//Updating arrays after drag and drop
function rebuildArrays(){
    backlogListArray = [];
    for(let i=0; i < backlogList.children.length; i++){
        backlogListArray.push(backlogList.children[i].textContent)
    }
    progressListArray = [];
    for(let i=0; i < progressList.children.length; i++){
        progressListArray.push(progressList.children[i].textContent)
    }
    completeListArray = [];
    for(let i=0; i < completeList.children.length; i++){
        completeListArray.push(completeList.children[i].textContent)
    }
    onHoldListArray = [];
    for(let i=0; i < onHoldList.children.length; i++){
        onHoldListArray.push(onHoldList.children[i].textContent)
    }
    updateDOM();

}

//Drag function
function drag(event){
    draggedItem = event.target;

}

//Drop function allow
function allowDrop(e){
    e.preventDefault();

};
//Item enters the columne area
function dragEnter(col){
    listColumns[col].classList.add('over')
    currentColumn = col;
}

//Dropping item in column
function drop(e){
    e.preventDefault();
    //Remove background color padding
    listColumns.forEach(column => column.classList.remove('over'));

    //Add item to column
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
    rebuildArrays();
}


//on Load

updateDOM();