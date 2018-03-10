//initial array of TV shows
var shows = ["The Office", "Parks and Recreation", "New Girl", "The West Wing", "Gilmore Girls", "Grey's Anatomy", "Friends", "Broad City", "The Mindy Project"];

function displayGifs () {
    var tv = $(this).attr("data-name");
    var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" + tv + "&api_key=60Mj0u6GeOSVllwBfy9oNQcgdaRysAg7&limit=10&offset=10";
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log (response);
        console.log (response.data);
        var results = response.data;
        var gifDiv = $("#tv-view");
        gifDiv[0].innerHTML = "";
        for (var i = 0; i < results.length; i++) {
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var image = $("<img>").attr("src",results[i].images.fixed_height_still.url);
            image.attr("data-src", results[i].images.fixed_height.url);
            image.attr("class","gif");
            image.on("click",toggleAnimate);
            gifDiv.append(p);
            gifDiv.append(image);
        }
    });
}
function toggleAnimate() {
    console.log("GIF clicked");
    var src = $(this).attr("src");
    var dataSrc = $(this).attr("data-src");
    $(this).attr("src", dataSrc);
    $(this).attr("data-src", src);
}
function renderButtons() {
    $("#buttonsView").empty();
    for (var i = 0; i < shows.length; i++) {
        var a = $("<button>");
        a.addClass("TVshow");
        a.attr("data-name", shows[i]);
        a.text(shows[i]);
        $("#buttonsView").append(a);
    }
}
$("#add-tv").on("click", function (event) {
    event.preventDefault();
    var tv = $("#tv-input").val().trim();
    $("#tv-input").val("");
    shows.push(tv);
    renderButtons();
});

$(document).on("click", ".TVshow", displayGifs);
renderButtons();
