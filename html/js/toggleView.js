function toggleView(a) {
    console.log(a.id);
    if (!a.className.includes("active")) {

        $.get("/settings/ui/default_view/" + a.id);

        var f = document.getElementById("submenu-Library").getElementsByClassName("contentdivs")
        var d
        for (d = 0; d < f.length; d++) {
            if (f[d].className.includes("active")) {
                f[d].classList.remove("active")
            }
        }
        a.classList.add("active")
        $("#library-entries").find(".bigcontainer").toggle();
        $("#library-entries").find(".lilcontainer").toggle();
    }
}

function toggleHover() {
    $(".library-card").on('mouseover', function(){
        $(this).find('.posteroverlay').stop().fadeTo(100, 0.9);
    });
    $(".library-card").on('mouseout', function(){
        $(this).find('.posteroverlay').stop().fadeTo(100, 0);
    });
}