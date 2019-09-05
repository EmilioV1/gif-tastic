$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonArea');
    console.log("page loaded");
})


var searchArray = ['dog', 'cat', 'bird'];

// Populates buttons to page
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

// Hits giphy api for data, collects still, collects animated url and appends gif
$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=uQIcYcgq3RPyde5FOKWYggxoWS7A9hFN&limit=10'
    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response){
            for(var i=0; i<response.data.length; i++){
                var searcgDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }        
        })
})