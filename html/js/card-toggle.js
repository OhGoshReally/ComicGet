function cardtoggleon (cont) {
    if (scrolled === 0){
        if (animationcount < 2){
            animationcount++
            $(cont).show(250, function() {
                animationcount--
            });
        }
    }
}
function cardtoggleoff (cont) {
    animationcount++
    $(cont).hide(250, function() {
        animationcount--
    });
}