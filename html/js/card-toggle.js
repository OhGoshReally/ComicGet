function cardtoggleon (cont) {

    cont = cont.firstChild.childNodes[1].id

    var getcards = document.getElementsByClassName("addon-card");
    var getcards = Array.prototype.slice.call(getcards);
    var showthisdiv = getcards.filter(word => word.id == cont)
    var hidethesedivs = getcards.filter(word => word.id !== cont)

    if (scrolled === 0){
     
       if (showthisdiv[0].style.display == "none") {
            for (var x in hidethesedivs){
                if (hidethesedivs[x].style.display !== "none"){
                    $(hidethesedivs[x]).finish();
                    $(hidethesedivs[x]).hide();
                }
            }
            $(showthisdiv).show(250);
        } 
    }
}

function cardtoggleoff (cont) {

    cont = cont.firstChild.childNodes[1].id

    var getcards = document.getElementsByClassName("addon-card");
    var getcards = Array.prototype.slice.call(getcards);
    var hidethisdiv = getcards.filter(word => word.id == cont)

    $(hidethisdiv).hide(250);

}