function resetList(){
    var element = document.getElementById('resultbar');
    if (element.hasChildNodes(element)) {
        var childs = element.childNodes
        for (var i = 0; i < childs.length; i++) {
            currentchild = childs[i].id
            $('#' + currentchild).fadeOut(500);
        }
        var element = document.getElementById('resultbar');
        element.innerHTML = '';
    }
}