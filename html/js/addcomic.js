function addcomic(q) {
    var a
    var s
    var d
    var f

    function switchadd(a, f) {

        var div = document.createElement('div');
        div.setAttribute('class', 'card-body');
        div.setAttribute('id', "addedcard" + f);
        div.setAttribute('style', "text-align: center; color: #57b86c;");
        a.appendChild(div);

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
        div.innerHTML = 'Added ' + (a.getElementsByClassName("title")[0].innerText).toString() + ' to library';
        document.getElementById("addedinnercard2" + f).appendChild(div);

        $("addedcard" + f).hide();
        $(a.firstChild).hide(200, function(){
            $("addedcard" + f).show(200);
            $.get(
                "add/" + f,
                function() {
                    $.getJSON( "/fetchsettings", function(settings){
                        showLibrary(settings);
                    })
                }
            );
            waitremove = setTimeout(function(){
                $(a).hide(200, function(){
                    a.remove(a);
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

    function findid(a) {
        f = a.getElementsByClassName("comic-id")[0].innerText
        switchadd(a, f)
    }

    function findtitle(a) {
        s = a.getElementsByClassName("title")[0].innerText
        findid(a)
    }

    function findrootdiv(q) {
        function iterate(q){
            q = q.parentElement
            if (q.className.includes("resultcards")) {
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

function removeComic(id) {

    $('#deleteConfirm').modal('hide');
    $('#exampleModal').modal('hide');

    bigPageOff()

    $( "#library-entries" ).find(".comic-id:contains(" + id + ")").parents("li").hide(250, function(){
        $( "#library-entries" ).find(".comic-id:contains(" + id + ")").parents("li").remove();
        $.get(
            "remove/" + id,
            function() {
                $.getJSON( "/fetchsettings", function(settings){
                    showLibrary(settings);
                })
            }
        );
    })  
}