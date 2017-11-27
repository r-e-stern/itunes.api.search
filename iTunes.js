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

function handle(result){
    $("#main").empty().append("<table></table>");
    $("#main table").toggle();
    var count = 0;
    for(var i=0; i<result.resultCount; i++){
        if(result.results[i].kind == "song"){
            $("#main table").append("<tr></tr>");
            $("#main table tr:last-child").append("<td><img src='"+result.results[i].artworkUrl30+"'></td>").append("<td>"+result.results[i].trackName+"</td>");
            count++;
        }
        if(count==25){
            break;
        }
    }
    var showStr = ""
    $("table").toggle();
    $("tr").toggle();
    for(var i=0; i<count; i++){
        $("#main table tr:nth-child("+i+")").delay(i*100).fadeTo(300,1);
        console.log("tst");
    }
}

$(document).ready(function () {
   $("input").keyup(function(){
       if(event.code == "Enter" && this.value!=""){
           var searchterm = this.value.toLowerCase().replace(" ","+");;
           $.ajax({
               url: "https://itunes.apple.com/search?term=" + searchterm,
               type: 'GET',
               crossDomain: true,
               dataType: 'jsonp',
               success: function(result){
                   console.log(result);
                   handle(result);
               },
               error: function(){alert('Failed!');}
           });
       }
   });
});

// #0f678b
// #4d9490

//INPUT: w/o octothorpe
function gradient(colora, colorb, stops){
    var colora1 = parseInt(colora.substring(0,2),16);
    var colora2 = parseInt(colora.substring(2,4),16);
    var colora3 = parseInt(colora.substring(4,6),16);
    var colorb1 = parseInt(colorb.substring(0,2),16);
    var colorb2 = parseInt(colorb.substring(2,4),16);
    var colorb3 = parseInt(colorb.substring(4,6),16);
    var weight = 0;
    var r = 0;
    var g = 0;
    var b = 0;
    var color = [];
    console.log(colora1, colora2, colora3, colorb1, colorb2, colorb3);
    for(var i=0; i<(2+stops); i++){
        weight = i/(1+stops);
        r = Math.floor(colorb1*weight + colora1*(1-weight)).toString(16);
        g = Math.floor(colorb2*weight + colora2*(1-weight)).toString(16);
        b = Math.floor(colorb3*weight + colora3*(1-weight)).toString(16);
        if(r.length==1){r="0"+r;}
        if(g.length==1){g="0"+g;}
        if(b.length==1){b="0"+b}
        color.push("#"+r+g+b);
    }
    return color;
}