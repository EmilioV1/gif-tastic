$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("page loaded");
})


var searchArray = ['Dog', 'Cat', 'Bird'];

// Populates buttons to page
function populateButtons(searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(var i = 0; i < searchArray.length; i++){
         var a = $('<button type="button" class="btn btn-secondary btn-sm">');
         a.addClass(classToAdd);
         a.attr('data-type', searchArray[i]);
         a.text(searchArray[i]);
         $(areaToAddTo).append(a);
    }
}

// Hits giphy api for data, collects still, collects animated url and appends gif
$(document).on('click', '.searchButton', function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=uQIcYcgq3RPyde5FOKWYggxoWS7A9hFN&limit=10'
    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response){
            for(var i=0; i<response.data.length; i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
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

// // Allows gifs to be paused and played upon being clicked
$(document).on('click', '.searchImage', function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

// Adds input to the array and populates button to page
$('#addSearch').on('click', function(){
    console.log('I have been clicked');
    var newSearch = $('input').eq(0).val();
    console.log(newSearch);
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton','#buttonsArea');
    return false;
})

  