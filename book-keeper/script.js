const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-url');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


// Show modal
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();

}

//Modal event listener

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', ()=>modal.classList.remove('show-modal'));
window.addEventListener('click', (e)=> e.target === modal? modal.classList.remove('show-modal') : false);