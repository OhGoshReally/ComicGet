function toggleView(a) {
    if (!a.className.includes("active")) {

        var f = document.getElementById("submenu-Library").getElementsByClassName("contentdivs")
        var d
        for (d = 0; d < f.length; d++) {
            if (f[d].className.includes("active")) {
                f[d].classList.remove("active")
            }
        }
        a.classList.add("active")
        $(".lilcontainer").toggle();
        $(".bigcontainer").toggle();
    }
}

function cardHoverOn(r) {
    if (r.firstChild.firstChild.className == "posteroverlay" && r.firstChild.style.display == "") {
        $(r.firstChild.firstChild).fadeTo(100, 0.9);
    } else {
        $(r.lastChild.firstChild).fadeTo(100, 0.9);
    }/*
    $(r).animate({
        top: "-=10",
        boxShadow: "0px 10px 4px 2px hsla(0, 0%, 0%, 0.27);"
        }, 100, function() {
        // Animation complete.
    });*/
}

function cardHoverOff(r) {
    if (r.firstChild.firstChild.className == "posteroverlay" && r.firstChild.style.display == "") {
        $(r.firstChild.firstChild).fadeTo(100, 0);
    } else {
        $(r.lastChild.firstChild).fadeTo(100, 0);
    }
    /*
    $(r).animate({
        top: "+=10",
        boxShadow: "0px 1px 4px 2px hsla(0, 0%, 0%, 0.27)"
        }, 100, function() {
        // Animation complete.
    });*/
}