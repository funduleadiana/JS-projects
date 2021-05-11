const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

//In the case of larger arrays a more efficient way is to change from array to object
/**
 * let bookmarks = {};
 * 
 * instead of bookmarks.forEach()
 * Object.keys(bookmarks).forEach((id) => {})
 * 
 * deleteBookmark(id){
 * if(bookmarks[id]){
 *      delete bookmarks[id]
 * }}
 * 
 * 
 */
// Show modal
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();

}

//Modal event listener

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', ()=>modal.classList.remove('show-modal'));
window.addEventListener('click', (e)=> e.target === modal? modal.classList.remove('show-modal') : false);


//Validate url
function validateUrl(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('Please submit values for both fields.');
        return false;
    }
  
    if(!urlValue.match(regex)){
        alert('Please provide a valid web address');
        return false;
    }
    return true;

};
//Building bookmarks

function buildBookmarks(){
    //Remove all bookmark elements
    bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        //Item
        const item = document.createElement('div');
        item.classList.add('item');
        //close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-trash-alt');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        //Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');

        //Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);

    });
}

function fetchBookmarks(){
    //Get bookmarks if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        //Create a bookmarks arr in local storage
        bookmarks = [
            {
                name: 'Google',
                url: 'https://google.com',
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks();
};

//Delete bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark, i)=> {
        if(bookmark.url === url){
            bookmarks.splice(i, 1);
        }
    });
    //Update bookmarks array in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

//handle submit
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('http://') && !urlValue.includes('https://')){
        urlValue = `https://${urlValue}`;
    }
    if(!validateUrl(nameValue, urlValue)){
        return false;
    } 
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    //Save to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();

}




bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();