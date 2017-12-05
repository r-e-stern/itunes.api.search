/*
    ADD SETTINGS
    ADD FAILURE PROTOCOL
*/
var getN = 25;

function handle(result){
    $("#main").empty().append("<img src='Rolling.gif'><table></table>").find("table").toggle();
    var count = 0;
    var res = 0;
    var color = gradient("ffffff","b3b3b3",result.resultCount);
    for(var i=0; i<result.resultCount; i++){
        count = i+1;
        res = result.results[i];
        $("table").append("<tr></tr>").find("tr:last-child").append("<td style='color:"+color[i]+"'>"+count+"</td><td><img src='"+res.artworkUrl100+"'></td>"+"<td><em>"+res.trackName+"</em><br><span>"+res.artistName+"</span><br/><span>"+res.collectionName+"</span></td>");
        if(res.trackExplicitness == "explicit"){
            $("table").find("tr:last-child td:nth-child(3) span:first-of-type").append(" <strong>Explicit</strong>");
        }
    }
    $("table").toggle().find("tr").toggle();
    for(var j=0; j<$("table").children().length; j++){
        count = j+1;
        res = result.results[j];
        $("tr:nth-child("+count+")").wrapInner("<a href='"+res.trackViewUrl+"' target='_blank'></a>").append("<td><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/480px-Speaker_Icon.svg.png'></td>").delay(j*100).fadeTo(300,1);
        $("tr:nth-child("+count+") > td > img").wrap("<a target='_blank' href='"+res.previewUrl+"'></a>").before("<span>&nbsp;"+msToMinSec(res.trackTimeMillis)+"</span><br>");
    }
    $("#main > img").delay(100*result.resultCount).slideUp(600);
    $("input").attr("placeholder", $("input").val()).val('');
}

$(document).ready(function(){
    $("header").toggle();
    $("input").keyup(function(){
        if(event.code == "Enter" && this.value!=""){
           var searchterm = this.value.toLowerCase().replace(" ","+");;
           $.ajax({
               url: "https://itunes.apple.com/search?term=" + searchterm +"&media=music&limit="+getN+"&entity=song",
               type: 'GET',
               crossDomain: true,
               dataType: 'jsonp',
               success: function(result){
                   handle(result);
               },
               error: function(){$("#main").empty().append("<h3>Search failed.</h3>");}
           });
        }
    });
    $(document).on("keypress", function(e){
        if(e.ctrlKey && e.which == 19){
            $("header").slideToggle(400).find("input").val(getN);
            slide();
        }
    })
});

function slide(){
    getN = $("header input").val();
    var margin = (($("header input").val()-1)/49*93)+1.35;
    var txt = $("header input").val();
    if(txt.toString().length == 1){
        txt= "&nbsp;"+txt;
    }
    $("i").html(txt).css("margin-left",margin+"%");
}

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

function msToMinSec(n) {
    var min = Math.floor(n/60000);
    var sec = Math.floor((n-(min*60000))/1000);
    if(sec.toString().length == 1){sec = "0"+ sec;}
    return min + ":" + sec;
}