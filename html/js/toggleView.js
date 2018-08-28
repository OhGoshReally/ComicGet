function toggleView(a) {
    if (!a.className.includes("active")) {
        console.log(a)
        //element.classList.add("active")

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
    console.log(r);
    if (r.firstChild.firstChild.className == "posteroverlay" && r.firstChild.style.display == "") {
        $(r.firstChild.firstChild).fadeTo(100, 0.9);
    } else {
        $(r.lastChild.firstChild).fadeTo(100, 0.9);
    }
}

function cardHoverOff(r) {
    console.log(r);
    if (r.firstChild.firstChild.className == "posteroverlay" && r.firstChild.style.display == "") {
        $(r.firstChild.firstChild).fadeTo(100, 0);
    } else {
        $(r.lastChild.firstChild).fadeTo(100, 0);
    }
}