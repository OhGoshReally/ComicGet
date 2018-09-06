function showLibrary(settings) {
    var listfile = "/static/library/list.json"
    var imgdir = "/static/library/img"

    if (settings['ui']['default_view'] == "view-poster"){
        $('#view-poster').addClass("active");
        $('#view-card').removeClass("active")
    }

    $('#library-entries').off('DOMNodeInserted');
    $('#library-entries').on('DOMNodeInserted',function(e){

        var librarylistener

        clearTimeout(librarylistener)
        librarylistener = setTimeout(function(){ $('#library-entries').off('DOMNodeInserted'); }, 6000);

        var lt = e.target;
        if (lt.className == "progress-fill-text") {
        } else if (lt.className == "prevsyn") {
            function test(b) {
                var g = b.getElementsByClassName("progress-bar")
                var h = b.getElementsByClassName("progress-fill-text")
                if ($(g).width() == "0") {
                } else {
                    function barWidth(g, h) {
                        function lel() {
                            var thebarWidth = $(g).width()
                            $(h).css('width',thebarWidth);
                        }
                        setTimeout(lel, 500)
                        window.onresize = function() {
                            var allbars = document.getElementsByClassName("progress-fill-text")
                            var y
                            for (y = 0; y < Number(allbars.length); y++) {
                                var totalWidth = $(allbars[y].parentElement.parentElement).width();
                                $(allbars[y]).css('width', totalWidth)
                            }
                        }
                    }
                    barWidth(g, h);
                }
            }
            function findtagroot(t) {
                function tagiterate(t){
                    t = t.parentElement
                    if (t.className.includes("resultcards")) {
                        var b = t
                        test(b)
                    } else {
                        tagiterate(t)
                    }
                }
                tagiterate(t)
            }
            findtagroot(lt)
        }
    });

    if (document.getElementById("library-entries").firstChild) {
        var myNode = document.getElementById("library-entries");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    var entireList = []

    $.getJSON(listfile, callbackFuncWithData);
    function callbackFuncWithData(data){

        var i
        for (i in data) {

            var published = data[i].start_date
            var ongoing = data[i].status
            var serialization = data[i].publisher
            var str = data[i].title
            var syno = data[i].synopsis
            var rating = data[i].rating

            if (published !== null) {
                published = ' (' + published.slice(0, 4) + ')'
            }

            entireList.push(data[i].title + published)

            var div = document.createElement('div');
            div.setAttribute('class', 'card resultcards library-card');
            //div.setAttribute('onclick', 'removecomic(this)');
            div.setAttribute('onclick', 'bigPageOn(this)');
            document.getElementById('library-entries').appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'posteroverlay');
            div.appendChild(div2);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay-table');
            div2.appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'posteroverlay-text');
            div2.innerHTML = data[i].title + published
            div.appendChild(div2);

            var div = document.createElement('div');
            div.setAttribute('class', 'container imgdiv lilcontainer');
            if (settings['ui']['default_view'] == "view-card"){
                div.setAttribute('style', 'display: none;');
            }
            $(div2).parents(".library-card")[0].appendChild(div);

            var div2 = document.createElement('img');
            div2.setAttribute('class', 'card-img-top posterimg');
            div2.setAttribute('src', imgdir + '/' + i + '/poster.jpg');
            div.appendChild(div2);

            var div = document.createElement('div');
            if (settings['ui']['default_view'] == "view-poster"){
                div.setAttribute('style', 'display: none;');
            }
            div.setAttribute('class', 'container bigcontainer');
            $(div2).parents(".library-card")[0].appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'container-fluid');
            div.appendChild(div2);

            //////////////////////////////

            var div3 = document.createElement('div');
            div3.setAttribute('class', 'row cardrow');
            div2.appendChild(div3);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'col-2 imgdiv');
            div3.appendChild(div2);

            var div = document.createElement('img');
            div.setAttribute('class', 'card-img-top');
            div.setAttribute('src', imgdir + '/' + i + '/poster.jpg');
            div.setAttribute('alt', 'Card image' + i + 'cap');
            div2.appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div3.appendChild(div);

            var div5 = document.createElement('div');
            div5.setAttribute('class', 'h-100 d-flex flex-column');
            div.appendChild(div5);

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            div5.appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'card-body titlecard');
            div.appendChild(div2);

            var div3 = document.createElement('div');
            div3.setAttribute('class', 'container');
            div2.appendChild(div3);

            var div4 = document.createElement('div');
            div4.setAttribute('class', 'row');
            div3.appendChild(div4);

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            div3.appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'container');
            div.appendChild(div2);

            ///////////////////

            var div = document.createElement('h6');
            div.setAttribute('class', 'chapter-titles');
            div.innerHTML = data[i].chapters + " Chapters";
            div2.appendChild(div);

            ///////////////////

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div4.appendChild(div);

            var div7 = document.createElement('h5');
            div7.setAttribute('class', 'comic-titles');
            div.appendChild(div7);

            ///////////

            var div = document.createElement('div');
            div.setAttribute('class', 'col-2 indexertab');
            div4.appendChild(div);

            var div2 = document.createElement('h5');
            div2.setAttribute('class', 'indexer d-none d-lg-block');
            div2.innerHTML = data[i].indexer;
            div4.appendChild(div);

            ///////////////////

            var div6 = document.createElement('div');
            div6.setAttribute('class', 'row');
            div5.appendChild(div6);
            
            var div3 = document.createElement('div');
            div3.setAttribute('class', 'row flex-grow-1');
            div5.appendChild(div3);

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div.setAttribute('style', 'align-self: flex-end;');
            div3.appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'card-body tagcard');
            div.appendChild(div2);

            var div8 = document.createElement('div');
            div8.setAttribute('class', 'container tagcontainer');
            div8.setAttribute('style', 'padding: 0px;');
            div2.appendChild(div8);

            ///////////////

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'col-3');
            div2.setAttribute('style', 'align-self: flex-end;');
            div3.appendChild(div2);

            var div = document.createElement('div');
            div.setAttribute('class', 'card-body');
            div2.appendChild(div);

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'progress');
            div.appendChild(div2);

            var div = document.createElement('div');
            div.setAttribute('class', 'progress-bar');
            div.innerHTML = data[i].monitored.got + " / " + data[i].monitored.want
            div2.appendChild(div);

            var div2 = document.createElement('div');

            if (Number(data[i].monitored.got) < Number(data[i].monitored.want)) {
                div2.setAttribute('class', 'progress-fill progressbar-missing');
            } else if (Number(data[i].monitored.got) == Number(data[i].monitored.want) && data[i].status == "finished") {
                div2.setAttribute('class', 'progress-fill progressbar-complete');
            } else if (Number(data[i].monitored.got) == Number(data[i].monitored.want) && data[i].status == "current") {
                div2.setAttribute('class', 'progress-fill progressbar-ongoing');
            }

            var prgr
            prgr = "width: " + ((data[i].monitored.got * 100 / data[i].monitored.want) + "%;");

            div2.setAttribute('style', prgr);
            div.appendChild(div2);

            var div = document.createElement('div');
            div.setAttribute('class', 'progress-fill-text');
            div.innerHTML = data[i].monitored.got + " / " + data[i].monitored.want
            div2.appendChild(div);

            //////////////

            var div2 = document.createElement('div');
            div2.setAttribute('class', 'col');
            div6.appendChild(div2);

            var div = document.createElement('div');
            div.setAttribute('class', 'col-1');
            div6.appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'card-body syncard');
            div2.appendChild(div);

            //////////////////

            str = '<span class="title"> ' + str

            str = str + published

            str = str + '</span>'

            if (serialization !== null && serialization !== "") {
                str = str + '  <span class="badge badge-secondary toptag d-none d-md-inline">' + serialization + '</span>'
            }

            if (ongoing !== null) {
                if (ongoing == "finished") {
                    str = str + ' <span class="badge badge-danger toptag d-none d-sm-inline">Ended</span>'
                } else {
                    str = str + '  <span class="badge badge-success toptag d-none d-sm-inline">Ongoing</span>'
                }
            }

            if (rating !== null) {
                rating = rating.slice(0,1) + "." + rating.slice(1,2)
                str = str + ' <span class="badge badge-warning toptag d-none d-lg-inline">' + rating + '</span>'
            }
            
            //////////////////

            var div2 = document.createElement('p');
            div2.setAttribute('class', 'prevsyn');
            div2.innerHTML = syno;
            div.appendChild(div2);

            var div = document.createElement('span');
            div.innerHTML = str;
            div7.appendChild(div);

            var div2 = document.createElement('span');
            div2.setAttribute('class', "comic-id");
            div2.innerHTML = data[i].id;
            div.appendChild(div2);

            ///////////////////////

            var tagcount = Object.keys(data[i].tags).length;
            var x
            for (x = 0; x < tagcount; x++) {
                try {
                    if (x > 0) {
                        var div = document.createElement('span');
                        div.setAttribute('class', 'tagcomma');
                        div.innerHTML = ",";
                        div8.appendChild(div);

                        var div = document.createElement('span');
                        div.setAttribute('class', 'cattags');
                        div.innerHTML = data[i].tags[x];
                        div8.appendChild(div);
                    } else {
                        var div = document.createElement('span');
                        div.setAttribute('class', 'cattags');
                        div.innerHTML = data[i].tags[x];
                        div8.appendChild(div);
                    }
                } catch (error) {
                }
            }

            ///////////////////////

        }
        $( function() {
            $( "#localsearch" ).autocomplete({
              source: entireList
            });
            $("#ui-id-1").css('max-width',$("#localsearch").parent().width())
          } );
        toggleHover();
    }
}