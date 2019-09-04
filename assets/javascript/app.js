$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonArea');
    console.log("page loaded");
})

var searchArray = ['dog', 'cat', 'bird'];

// 
function populateButtons(searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(var i = 0; i < searchArray.length; i++){
         var a = $('<button>');
         a.addClass(classToAdd);
         a.attr('data-type', searchArray[i]);
         a.text(searchArray[i]);
         $(areaToAddTo).append(a);
    }
}