function readMore(paragraph) {
    if (paragraph.childNodes[0].style.display !== "none") {
        $(paragraph.childNodes[0]).fadeOut(250);
        $(paragraph.previousSibling).animate({ maxHeight: ($(paragraph.previousSibling)[0].scrollHeight) }, 250);
        paragraph.classList.remove("fa-angle-down");
        paragraph.classList.add("fa-angle-up");
    } else {
        $(paragraph.childNodes[0]).fadeIn(250);
        $(paragraph.previousSibling).animate({ maxHeight: 99 }, 250);
        paragraph.classList.remove("fa-angle-up");
        paragraph.classList.add("fa-angle-down");
    }
}