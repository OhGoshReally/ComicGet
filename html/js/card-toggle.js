function cardtoggleon (cont) {
    //if (scrolled === 0){
        $(cont).find(".addon-card").stop().show(250, 0);
    //}
}

function cardtoggleoff (cont) {
    $(cont).find(".addon-card").stop().hide(250, 0);
}