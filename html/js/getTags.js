function getTags() {
    console.log("getTags");
    var tagurl = 'https://kitsu.io/api/edge/manga/'
    var tagend = '/categories'
    $('body').on('DOMNodeInserted',function(e){
        var target = e.target;
        if (target.className == "comic-id") {

            var fulltagurl = tagurl + target.innerText + tagend

            $.getJSON(fulltagurl, callbackFuncWithData);
            function callbackFuncWithData(data){

                var t = target

                function findrootdiv(t) {
                    function iterate(t){
                        t = t.parentElement
                        if (t.className.includes("resultcards")) {
                            a = t
                            console.log(target);
                            console.log(a);
                            console.log(data);
                        } else {
                            iterate(t)
                        }
                
                    }
                    iterate(t)
                }

                findrootdiv(t)
            
                /*
                var div = document.createElement('i');
                div.setAttribute('class', 'fas fa-angle-down readmore');
                div.setAttribute('onClick', 'readMore(this);');
                div.innerHTML = '<div class="readmorefade"></div>';
                document.getElementById(target.parentNode.id).appendChild(div);*/
            }
        }
    });
}