function showLibrary() {
    var listfile = "/static/library/list.json"
    var imgdir = "/static/library/img"

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

            var div = document.createElement('div');
            div.setAttribute('class', 'card resultcards library-card');
            div.setAttribute('id', "library-card" + i);
            //div.setAttribute('style', 'opacity: 0;');
            div.setAttribute('onmouseover', 'cardHoverOn(this)');
            div.setAttribute('onmouseleave', 'cardHoverOff(this)');
            div.setAttribute('onclick', 'removecomic(this)');
            document.getElementById('library-entries').appendChild(div);
            
            var div = document.createElement('div');
            div.setAttribute('class', 'container imgdiv lilcontainer');
            div.setAttribute('style', 'display: none;');
            div.setAttribute('id', "library-poster" + i);
            document.getElementById('library-card' + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay');
            div.setAttribute('style', 'opacity: 0;');
            div.setAttribute('id', "library-posteroverlay" + i);
            document.getElementById('library-poster' + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay-table');
            div.setAttribute('id', "library-posteroverlay-table" + i);
            document.getElementById('library-posteroverlay' + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay-text');
            div.innerHTML = data[i].title + published
            document.getElementById('library-posteroverlay-table' + i).appendChild(div);

            var div = document.createElement('img');
            div.setAttribute('class', 'card-img-top posterimg');
            div.setAttribute('src', imgdir + '/' + i + '/poster.jpg');
            div.setAttribute('id', "library-posterimg" + i);
            document.getElementById('library-poster' + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'container bigcontainer');
            div.setAttribute('id', "library-firstcontainer" + i);
            document.getElementById("library-card" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay2');
            div.setAttribute('style', 'opacity: 0;');
            div.setAttribute('id', "library-posteroverlay2" + i);
            document.getElementById("library-firstcontainer" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay-table');
            div.setAttribute('id', "library-posteroverlay-table2" + i);
            document.getElementById('library-posteroverlay2' + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'posteroverlay-text');
            div.innerHTML = data[i].title + published
            document.getElementById("library-posteroverlay-table2" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'container-fluid');
            div.setAttribute('id', "library-innercontainer1" + i);
            document.getElementById("library-firstcontainer" + i).appendChild(div);

            //////////////////////////////

            var div = document.createElement('div');
            div.setAttribute('class', 'row cardrow');
            div.setAttribute('id', "library-cardrow" + i);
            document.getElementById("library-innercontainer1" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'col-2 imgdiv');
            div.setAttribute('id', "library-cardcol1" + i);
            div.innerHTML = '<img class="card-img-top" src="' + imgdir + '/' + i + '/poster.jpg' + '" alt="Card image' + i + 'cap">';
            document.getElementById("library-cardrow" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div.setAttribute('id', "library-cardcol2" + i);
            document.getElementById("library-cardrow" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'h-100 d-flex flex-column');
            div.setAttribute('id', "library-innercolumns" + i);
            document.getElementById("library-cardcol2" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            div.setAttribute('id', "library-innerrow1" + i);
            document.getElementById("library-innercolumns" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'card-body titlecard');
            div.setAttribute('id', "library-innercardbody" + i);
            document.getElementById("library-innerrow1" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'container');
            div.setAttribute('id', "library-innercontainer3" + i);
            document.getElementById("library-innercardbody" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            div.setAttribute('id', "library-innerrow4" + i);
            document.getElementById("library-innercontainer3" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            div.setAttribute('id', "library-innerrow5" + i);
            document.getElementById("library-innercontainer3" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'container');
            div.setAttribute('id', "library-innercontainer4" + i);
            document.getElementById("library-innerrow5" + i).appendChild(div);

            ///////////////////

            var div = document.createElement('h6');
            div.setAttribute('class', 'chapter-titles');
            div.innerHTML = data[i].chapters + " Chapters";
            document.getElementById("library-innercontainer4" + i).appendChild(div);

            ///////////////////

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div.setAttribute('id', "library-innercol3" + i);
            document.getElementById("library-innerrow4" + i).appendChild(div);

            var div = document.createElement('h5');
            div.setAttribute('class', 'comic-titles');
            div.setAttribute('id', "library-comictitle" + i);
            document.getElementById("library-innercol3" + i).appendChild(div);

            ///////////

            var div = document.createElement('div');
            div.setAttribute('class', 'col-2 indexertab');
            div.setAttribute('id', "library-innercol4" + i);
            document.getElementById("library-innerrow4" + i).appendChild(div);

            var div = document.createElement('h5');
            div.setAttribute('class', 'indexer d-none d-lg-block');
            div.innerHTML = data[i].indexer;
            document.getElementById("library-innercol4" + i).appendChild(div);

            ///////////////////

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            div.setAttribute('id', "library-innerrow2" + i);
            document.getElementById("library-innercolumns" + i).appendChild(div);
            
            var div = document.createElement('div');
            div.setAttribute('class', 'row flex-grow-1');
            div.setAttribute('id', "library-innerrow3" + i);
            document.getElementById("library-innercolumns" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div.setAttribute('style', 'align-self: flex-end;');
            div.setAttribute('id', "library-inneinnercol4" + i);
            document.getElementById("library-innerrow3" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'card-body tagcard');
            div.setAttribute('id', "library-tagcard" + i);
            document.getElementById("library-inneinnercol4" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'container tagcontainer');
            div.setAttribute('style', 'padding: 0px;');
            div.setAttribute('id', "library-tagcontainer" + i);
            document.getElementById("library-tagcard" + i).appendChild(div);

            ///////////////

            var div = document.createElement('div');
            div.setAttribute('class', 'col-3');
            div.setAttribute('style', 'align-self: flex-end;');
            div.setAttribute('id', "library-inneinnercol5" + i);
            document.getElementById("library-innerrow3" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'card-body');
            div.setAttribute('id', "library-progresscardbody" + i);
            document.getElementById("library-inneinnercol5" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'progress');
            div.setAttribute('id', "library-progress" + i);
            document.getElementById("library-progresscardbody" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'progress-bar');
            div.setAttribute('role', 'progressbar');
            div.setAttribute('aria-valuenow', '75');
            div.setAttribute('aria-valuemin', '0');
            div.setAttribute('aria-valuemax', '100');
            div.setAttribute('id', "library-progress-bar" + i);
            div.innerHTML = data[i].monitored.got + " / " + data[i].monitored.want
            document.getElementById("library-progress" + i).appendChild(div);

            var div = document.createElement('div');

            if (Number(data[i].monitored.got) < Number(data[i].monitored.want)) {
                div.setAttribute('class', 'progress-fill progressbar-missing');
            } else if (Number(data[i].monitored.got) == Number(data[i].monitored.want) && data[i].status == "finished") {
                div.setAttribute('class', 'progress-fill progressbar-complete');
            } else if (Number(data[i].monitored.got) == Number(data[i].monitored.want) && data[i].status == "current") {
                div.setAttribute('class', 'progress-fill progressbar-ongoing');
            }

            var prgr
            prgr = "width: " + ((data[i].monitored.got * 100 / data[i].monitored.want) + "%;");

            div.setAttribute('style', prgr);
            div.setAttribute('id', "library-progress-fill" + i);
            document.getElementById("library-progress-bar" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'progress-fill-text');
            div.setAttribute('id', "library-fill-text" + i);
            div.innerHTML = data[i].monitored.got + " / " + data[i].monitored.want
            document.getElementById("library-progress-fill" + i).appendChild(div);

            //////////////

            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div.setAttribute('id', "library-innercol5" + i);
            document.getElementById("library-innerrow2" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'col-1');
            div.setAttribute('id', "library-innercol6" + i);
            document.getElementById("library-innerrow2" + i).appendChild(div);

            var div = document.createElement('div');
            div.setAttribute('class', 'card-body syncard');
            div.setAttribute('id', "library-innercardbody2" + i);
            document.getElementById("library-innercol5" + i).appendChild(div);

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

            var div = document.createElement('p');
            div.setAttribute('class', 'prevsyn');
            div.setAttribute('id', "library-prevsyn" + i);
            div.innerHTML = syno;
            document.getElementById("library-innercardbody2" + i).appendChild(div);

            var div = document.createElement('span');
            div.setAttribute('id', "library-thetitle" + i);
            div.innerHTML = str;
            document.getElementById("library-comictitle" + i).appendChild(div);

            var div = document.createElement('span');
            div.setAttribute('class', "comic-id");
            div.innerHTML = data[i].id;
            document.getElementById("library-thetitle" + i).appendChild(div);

            ///////////////////////

            var tagcount = Object.keys(data[i].tags).length;
            var x
            for (x = 0; x < tagcount; x++) {
                try {
                    if (x > 0) {
                        var div = document.createElement('span');
                        div.setAttribute('class', 'tagcomma');
                        div.innerHTML = ",";
                        document.getElementById("library-tagcontainer" + i).appendChild(div);

                        var div = document.createElement('span');
                        div.setAttribute('class', 'cattags');
                        div.innerHTML = data[i].tags[x];
                        document.getElementById("library-tagcontainer" + i).appendChild(div);
                    } else {
                        var div = document.createElement('span');
                        div.setAttribute('class', 'cattags');
                        div.innerHTML = data[i].tags[x];
                        document.getElementById("library-tagcontainer" + i).appendChild(div);
                    }
                } catch (error) {
                }
            }

            ///////////////////////

            (document.getElementById("library-innercontainer4" + i)).removeAttribute("id");
            (document.getElementById("library-innerrow5" + i)).removeAttribute("id");
            (document.getElementById("library-innerrow4" + i)).removeAttribute("id");
            (document.getElementById("library-innercontainer3" + i)).removeAttribute("id");
            (document.getElementById("library-innercardbody" + i)).removeAttribute("id");
            (document.getElementById("library-innerrow1" + i)).removeAttribute("id");
            (document.getElementById("library-prevsyn" + i)).removeAttribute("id");
            (document.getElementById("library-innercardbody2" + i)).removeAttribute("id");
            (document.getElementById("library-innercol5" + i)).removeAttribute("id");
            (document.getElementById("library-innerrow2" + i)).removeAttribute("id");
            (document.getElementById("library-innercol6" + i)).removeAttribute("id");
            (document.getElementById("library-tagcontainer" + i)).removeAttribute("id");
            (document.getElementById("library-tagcard" + i)).removeAttribute("id");
            (document.getElementById("library-innerrow3" + i)).removeAttribute("id");
            (document.getElementById("library-innercolumns" + i)).removeAttribute("id");
            (document.getElementById("library-cardcol2" + i)).removeAttribute("id");
            (document.getElementById("library-cardcol1" + i)).removeAttribute("id");
            (document.getElementById("library-cardrow" + i)).removeAttribute("id");
            (document.getElementById("library-innercol4" + i)).removeAttribute("id");
            (document.getElementById("library-comictitle" + i)).removeAttribute("id");
            (document.getElementById("library-innercol3" + i)).removeAttribute("id");
            (document.getElementById("library-thetitle" + i)).removeAttribute("id");
            (document.getElementById("library-innercontainer1" + i)).removeAttribute("id");
            (document.getElementById("library-firstcontainer" + i)).removeAttribute("id");
            (document.getElementById("library-inneinnercol4" + i)).removeAttribute("id");
            (document.getElementById("library-inneinnercol5" + i)).removeAttribute("id");
            (document.getElementById("library-progress" + i)).removeAttribute("id");
            (document.getElementById("library-progress-bar" + i)).removeAttribute("id");
            (document.getElementById("library-progress-fill" + i)).removeAttribute("id");
            (document.getElementById("library-fill-text" + i)).removeAttribute("id");
            (document.getElementById("library-progresscardbody" + i)).removeAttribute("id");
            (document.getElementById("library-poster" + i)).removeAttribute("id");
            (document.getElementById("library-posterimg" + i)).removeAttribute("id");
            (document.getElementById("library-posteroverlay" + i)).removeAttribute("id");
            (document.getElementById("library-posteroverlay-table" + i)).removeAttribute("id");
            (document.getElementById("library-posteroverlay-table2" + i)).removeAttribute("id");
            
            ///////////////////////

        }
    }
}