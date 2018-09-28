function hoverMenu() {
    $( "#menudiv" ).hover(
        function() {
            if ($("#smallPage")[0].style.display == "none") {
                $( this ).stop().fadeTo(200, 1);
            }
        }, function() {
            if ($("#smallPage")[0].style.display == "none") {
                $( this ).stop().fadeTo(200, 0.15);
            }
        }
    );
}