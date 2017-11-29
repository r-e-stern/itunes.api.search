/*  ADD ALBUM
    ADD RUNTIME
    ADD PREVIEW (somehow)
    ADD SETTINGS
*/

function handle(result){
    $("#main").empty().append("<table></table>");
    $("#main table").toggle();
    var count = 0;
    var color = gradient("ffffff","b3b3b3",result.resultCount);
    for(var i=0; i<result.resultCount; i++){
        count = i+1;
        $("#main table").append("<tr></tr>");
        $("#main table tr:last-child").append("<td style='color:"+color[i]+"'>"+count+"</td><td><img src='"+result.results[i].artworkUrl100+"'></td>"+"<td><em>"+result.results[i].trackName+"</em><br><span>"+result.results[i].artistName+"</span></td>");
    }
    $("table").toggle();
    $("tr").toggle();
    for(var i=0; i<$("table").children().length; i++){
        count = i+1;
        $("#main table tr:nth-child("+count+")").wrapInner("<a href='"+result.results[i].trackViewUrl+"' target='_blank'></a>").delay(i*100).fadeTo(300,1);
    }
    $("input").attr("placeholder", $("input").val()).val('');
}

$(document).ready(function () {
   $("input").keyup(function(){
       if(event.code == "Enter" && this.value!=""){
           var searchterm = this.value.toLowerCase().replace(" ","+");;
           $.ajax({
               url: "https://itunes.apple.com/search?term=" + searchterm +"&media=music&limit=25&entity=song",
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