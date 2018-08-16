function menutoggle(thebutton){
    var hidethisdiv
    var showthisdiv
    var allmenuitems = document.getElementById("menuoptions").childNodes
    var allmenuitems = Array.from(allmenuitems)
    var allmenuitems = allmenuitems.filter(word => word.nodeName == "LI")

    $.each(allmenuitems, function(i) {
        var cachename = allmenuitems[i].id.replace(/item[-]/igm, "");
        var act = "active"
        if (allmenuitems[i].className.includes(act)) {
            var element = document.getElementById(allmenuitems[i].id);
            element.classList.remove("active");
            hidethisdiv = cachename
        }
        if (allmenuitems[i].id == thebutton) {
            var element = document.getElementById(allmenuitems[i].id);
            element.classList.add("active")
            showthisdiv = cachename
        }
    });

    if (hidethisdiv !== showthisdiv){
        $('#' + hidethisdiv + ", #submenudiv").fadeOut(100, function(){
            $('#' + showthisdiv).fadeIn(100);
            $('.submenuoptions').hide();
            if (showthisdiv == "menu-Settings"){
                $('#submenuoptions-settings').show();
            }
            if (showthisdiv == "menu-System") {
                $('#submenuoptions-system').show();
            }
            if (showthisdiv == "menu-Home") {
                $('#submenuoptions-home').show();
            }
            if (showthisdiv == "menu-Activity") {
                $('#submenuoptions-activity').show();
            }
            if (showthisdiv == "menu-Wanted") {
                $('#submenuoptions-wanted').show();
            }
            $('#submenudiv').fadeIn(100);
        });
    }
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