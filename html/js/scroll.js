function isScroll(){
    isScrolling();
    scrolled = 1
    scrollTimer = setTimeout(function(){
        scrolled = 0
    }, 150);
}
function isScrolling() {
    clearTimeout(scrollTimer);
}