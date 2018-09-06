function menutoggle(thebutton){
    var hidethisdiv
    var showthisdiv
    var allmenuitems = document.getElementById("menuoptions").childNodes
    var allmenuitems = Array.from(allmenuitems)
    var allmenuitems = allmenuitems.filter(word => word.nodeName == "LI")

    if ($("#smallPage")[0].style.display == "none") {
        bigPageOff()
    }
    
    $("#menuoptions").children().removeClass("active");
    $(thebutton).parent().addClass("active");

    var cachename = $(thebutton).parent()[0].id.replace(/item[-]/igm, "");
    
    $("#smallPage").children().not("#divider").not("#"+cachename).filter(function() { return $(this).css('display') !== 'none'; }).fadeOut(100, function(){
        $("#smallPage").find("#"+cachename).fadeIn(100)
    })

    var cachename2 = cachename.replace(/menu[-]/igm,"");
    cachename2 = cachename2.toLowerCase();

    console.log($("#allsuboptions").children().not($("#submenuoptions-"+cachename2)))
    console.log($("#allsuboptions").find($("#submenuoptions-"+cachename2)))

    $("#allsuboptions").children().not($("#submenuoptions-"+cachename2)).filter(function() { return $(this).css('display') !== 'none'; }).fadeOut(100, function(){
        $("#allsuboptions").find($("#submenuoptions-"+cachename2)).fadeIn(100);
    });
}

function submenutoggle(thebutton){
    var hidethisdiv
    var showthisdiv
    var innerli = [];
    var allsubmenuitems = document.getElementsByClassName("submenuoptions");
    var allsubmenuitems = Array.from(allsubmenuitems);
    var allsubmenuitems = allsubmenuitems.filter(word => word.style.display !== "none");

    var count = allsubmenuitems[0].childNodes.length

    for (var i = 0; i < count; i++) {
        if (allsubmenuitems[0].childNodes[i].nodeName == "LI") {
            innerli.push(allsubmenuitems[0].childNodes[i]);
        }
    }

    var allsubmenuitems = innerli

    $.each(allsubmenuitems, function(i) {
        var cachename = allsubmenuitems[i].id.replace(/item[-]/igm, "");
        var act = "active"
        if (allsubmenuitems[i].className.includes(act)) {
            var element = document.getElementById(allsubmenuitems[i].id);
            element.classList.remove("active");
            hidethisdiv = cachename
        }
        if (allsubmenuitems[i].id == thebutton) {
            var element = document.getElementById(allsubmenuitems[i].id);
            element.classList.add("active")
            showthisdiv = cachename
        }
    });

    if (hidethisdiv !== showthisdiv){
        $('#' + hidethisdiv).fadeOut(100, function(){

            $('#' + showthisdiv).fadeIn(100);


        });
    }
}