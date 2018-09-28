function cardtoggleon (cont) {
    //if (scrolled === 0){
        $(cont).find(".addon-card").stop().slideDown(250, 0);
    //}
}

function cardtoggleoff (cont) {
    $(cont).find(".addon-card").stop().slideUp(250, 0);
}