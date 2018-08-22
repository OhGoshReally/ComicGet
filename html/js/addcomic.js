function addcomic(q) {
    var a
    var s
    var d
    var f

    function switchadd(s, d, f) {

        var parentdiv = document.getElementById(d);
        var rootdiv = document.getElementById(d).parentNode.id
        var div = document.createElement('div');
        div.setAttribute('class', 'card-body');
        div.setAttribute('id', "addedcard" + f);
        div.setAttribute('style', "text-align: center; color: #57b86c;");
        document.getElementById(rootdiv).appendChild(div);

        var div = document.createElement('div');
        div.setAttribute('class', 'card-body');
        div.setAttribute('id', "addedinnercard1" + f);
        document.getElementById("addedcard" + f).appendChild(div);

        var div = document.createElement('i');
        div.setAttribute('class', 'fas fa-check-circle');
        div.setAttribute('id', "checkmark" + f);
        div.setAttribute('style', "font-size: 40px;");
        document.getElementById("addedinnercard1" + f).appendChild(div);

        var div = document.createElement('div');
        div.setAttribute('class', 'card-body');
        div.setAttribute('style', 'padding-top: 0px;');
        div.setAttribute('id', "addedinnercard2" + f);
        document.getElementById("addedcard" + f).appendChild(div);
        
        var div = document.createElement('h3');
        div.setAttribute('style', "font-weight: bold");
        div.innerHTML = 'Added ' + s + ' to library';
        document.getElementById("addedinnercard2" + f).appendChild(div);

        $("addedcard" + f).hide();
        $(parentdiv).hide(200, function(){
            $("addedcard" + f).show(200);
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

    function findparentcontainer(a) {
        d = a.firstChild.id
        switchadd(s, d, f);
    }

    function findid(a) {
        f = a.getElementsByClassName("comic-id")[0].innerText
        findparentcontainer(a)
    }

    function findtitle(a) {
        s = a.getElementsByClassName("title")[0].innerText
        findid(a)
    }

    function findrootdiv(q) {
        function iterate(q){
            q = q.parentElement
            if (q.className.includes("resultcards")) {
                console.log(q);
                a = q
                findtitle(a)
            } else {
                iterate(q)
            }
    
        }
        iterate(q)
    }

    findrootdiv(q)

}