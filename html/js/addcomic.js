function addcomic(comicname, pardiv, comicid) {
    var parentdiv = document.getElementById(pardiv);
    var rootdiv = document.getElementById(pardiv).parentNode.id
    var div = document.createElement('div');
    div.setAttribute('class', 'card-body');
    div.setAttribute('id', "addedcard" + comicid);
    div.setAttribute('style', "text-align: center; color: #57b86c;");
    document.getElementById(rootdiv).appendChild(div);

    var div = document.createElement('div');
    div.setAttribute('class', 'card-body');
    div.setAttribute('id', "addedinnercard1" + comicid);
    document.getElementById("addedcard" + comicid).appendChild(div);

    var div = document.createElement('i');
    div.setAttribute('class', 'fas fa-check-circle');
    div.setAttribute('id', "checkmark" + comicid);
    div.setAttribute('style', "font-size: 40px;");
    document.getElementById("addedinnercard1" + comicid).appendChild(div);

    var div = document.createElement('div');
    div.setAttribute('class', 'card-body');
    div.setAttribute('style', 'padding-top: 0px;');
    div.setAttribute('id', "addedinnercard2" + comicid);
    document.getElementById("addedcard" + comicid).appendChild(div);
    
    var div = document.createElement('h3');
    div.setAttribute('style', "font-weight: bold");
    div.innerHTML = 'Added ' + comicname + ' to library';
    document.getElementById("addedinnercard2" + comicid).appendChild(div);

    $("addedcard" + comicid).hide();
    $(parentdiv).hide(200, function(){
        $("addedcard" + comicid).show(200);
        waitremove = setTimeout(function(){
            $('#' + rootdiv).hide(200, function(){
                var element = document.getElementById(rootdiv);
                element.remove(element);
                (document.getElementById("resultnumber").innerText)--
                if ((document.getElementById("resultnumber").innerText) == 0) {
                    var element = document.getElementById("resultnumber").parentNode.parentNode
                    $(element).hide(200, function(){
                        element.remove(element);
                    });
                }
            });
        }, 1500);
    });
}