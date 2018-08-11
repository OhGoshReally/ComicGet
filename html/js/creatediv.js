function creatediv(thetype, theclass, theid, theinnertext, theparent) {
    var div = document.createElement(thetype);
    div.setAttribute('class', theclass);
    div.setAttribute('id', theid);
    div.innerHTML = theinnertext;
    document.getElementById(theparent).appendChild(div);
}