function toggleView(a) {
    if (!a.className.includes("active")) {

        $.get("/settings/default_view/" + (a.id.slice(5,999)));

        $( a ).parent().parent().find(".contentdivs").removeClass("active");
        $( a ).addClass("active");

        if (a.id == "view-poster") {
            $("#library-entries").find(".bigcontainer").hide();
            $("#library-entries").find(".lilcontainer").show();
        }
        else if (a.id == "view-card") {
            $("#library-entries").find(".bigcontainer").show();
            $("#library-entries").find(".lilcontainer").hide();
        }
    }
}