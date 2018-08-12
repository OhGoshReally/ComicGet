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

    $('#' + hidethisdiv).hide(100, function(){
        $('#' + showthisdiv).show(100);
        if (showthisdiv == "menu-Settings"){
            $('#submenudiv').show(100);
        } else if (hidethisdiv == "menu-Settings") {
            $('#submenudiv').hide(100);
        }
    });

}