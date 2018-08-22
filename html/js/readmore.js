function readMore(paragraph) {
    console.log(paragraph);
    console.log(paragraph.childNodes);
    console.log(paragraph.previousSibling);
    if (paragraph.childNodes[0].style.display !== "none") {
        $(paragraph.childNodes[0]).fadeOut(250);
        $(paragraph.previousSibling).animate({ maxHeight: 999 }, 250);
        paragraph.classList.remove("fa-angle-down");
        paragraph.classList.add("fa-angle-up");
    } else {
        $(paragraph.childNodes[0]).fadeIn(250);
        $(paragraph.previousSibling).animate({ maxHeight: 99 }, 250);
        paragraph.classList.remove("fa-angle-up");
        paragraph.classList.add("fa-angle-down");
    }
}