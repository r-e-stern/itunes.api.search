// $.ajax({
//     url: "https://itunes.apple.com/search?term=alexander+courage",
//     type: 'GET',
//     crossDomain: true,
//     dataType: 'jsonp',
//     success: function(result) {
//         console.log(result);
//         handle(result) },
//     error: function() { alert('Failed!'); }
// });

function handle(){

}

$(document).ready(function () {
   $("input").keyup(function(){
       if(event.code == "Enter"){
           console.log("Enter pressed.");
       }
   });
});