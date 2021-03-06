document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
//get from values
var siteName = document.getElementById('siteName').value;
var siteURL = document.getElementById('siteURL').value;

if(!validateForm(siteName, siteURL)){

    return false;
}
var bookmark = {
    name: siteName,
    url: siteURL
}
/*//console.log(bookmark);
//local storage test
localStorage.setItem('test','Hello world!');
cosole.log(localStorage.getItem('test'));
*/
//Test if book,marks is null
if(localStorage.getItem('bookmarks')===null){
    //init array
    var bookmarks =[];
    //Add to array
    bookmarks.push(bookmark);
    //set to localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
else{
    //get bookmarks from localStorage
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmarks to array
    bookmarks.push(bookmark);
    //Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
//clear form
document.getElementById('myForm').reset();
//Re-fetch bookmarks
fetchBookmarks();
//prevent form from submitting
e.preventDefault();
}
//Delete bookmark
function deleteBookmark(url){
    //Get bookmarks from the localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through Bookmarks
    for( var i = 0; i< bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //Remove from array
            bookmarks.splice(i,1);
        }
    }
    //Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Re-fetch bookmarks
    fetchBookmarks();
}
function fetchBookmarks(){
 var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 // Get output id
 var bookmarksResults = document.getElementById('bookmarksResults');
 // Bulid output
 bookmarksResults.innerHTML='';
 for( var i = 0; i< bookmarks.length; i++){
     var name = bookmarks[i].name;
     var url = bookmarks[i].url;
     
     bookmarksResults.innerHTML += '<div class = "well">' +
                                    '<h3>' +name+
                                    '<a class ="btn btn-default" targets ="_blank" href="'+url+'"> Visit</a>' +
                                    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete </a>' +
                                    '</h3>' + '</div>';
 }
}
//validation form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}