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
    })
    progressList.textContent = '';
    progressListArray.forEach((progressItem, index)=> {
        createItemEl(progressList, 0, progressItem, index);
    })
    completeList.textContent = '';
    completeListArray.forEach((completeItem, index)=> {
        createItemEl(completeList, 0, completeItem, index);
    })
    onHoldList.textContent = '';
    onHoldListArray.forEach((onHoldItem, index)=> {
        createItemEl(onHoldList, 0, onHoldItem, index);
    })

}


//Drag function
function drag(e){
    draggedItem = e.target;

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
}


//on Load

updateDOM();