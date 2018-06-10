


$(document).ready(function () {
    //Arrray list of reactions
    var btnArray = ["Mind-blown", "Amazed", "Eww", "No", "Interesting"];
    
    
    // this function displays reaction buttons
    
    function renderButtons() {
     
        //this deletes the buttons before adding new ones to not repeat
        $("#btnView").empty();
        

        //created a loop to go through array of reaciton gifs
        for (var i = 0; i < btnArray.length; i++) {

            //creates buttons for each reaction in the array
            var btnCreate = $("<button>").addClass("btn").attr("data-name", btnArray[i]).text(btnArray[i]);
            
            //appends buttons to the HTML
            $("#btnView").append(btnCreate);
        }
    }

     //renderButtons function to initially display list of gifs
     renderButtons();
     
     
     function displayGifs() {
        //grabs/stores the data-name property value from the button
        var gifName = $(this).attr("data-name");
        //query URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=3b2N7RSq7uY2ebDqyg25T0OXSd6Myxy5";
        
        //AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
       
        }).then(function (response) {
            
            console.log(response);
            
            //store data from AJAX call to results
            
            var results = response.data;
            //loops over 
            for (var i = 0; i < results.length; i++) {
                //variable to hold gifs
                var gifDiv = $("<div>").addClass("holdsGif");
                
                
                
                //create variable to hold image
                var gifImage = $("<img>").attr({
                    class: "gif",
                    src: stillImg,
                    "data-still": stillImg,
                    "data-animate": playGif,
                    "data-state": "still"
                });
                
                
                //retrieve URL for image
                var stillImg = results[i].images.fixed_height_still.url;
                var playGif = results[i].images.fixed_height.url;
                
                //appends image to DOM
                gifDiv.append(gifImage);
                
                //places results above the previous gif results 
                $("#actualGifs").prepend(gifDiv);
            }

            
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }
    
  
    $(document).on("click", ".btn", displayGifs);
})


// Not completed 
//search bar capabilites - user to be able to input a reaction, adding button, and displaying relevant gifs
// spacing between gif images

 
