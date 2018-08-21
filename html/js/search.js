function querySearch(){

    var entry = document.getElementById('myInput').value
    var url = 'search/'
    var queryurl = encodeURI(url + entry);
    var results = ''
    var string
    var allcards = [];
    var count

    function addtheresults(thediv){
        allcards.push(thediv);
    }

    function beginShow() {
        var i = 0
        function slowlyAdd() {
            setTimeout(function(){
                $(allcards[i]).fadeIn(250, function(){
                    i++
                    if (i < allcards.length) {
                        slowlyAdd();
                    }
                });
            }, 50);
        }
        slowlyAdd();
    }

    $.getJSON(queryurl, callbackFuncWithData);

    function callbackFuncWithData(data){

        console.log(data);
        console.log(data.indexer_id);

        if (data.data.length > 0) {
            results = "<h5>Found <span id=\"resultnumber\">" + data.data.length + "</span> results.</h5>"
            
            if (document.getElementById("resultbar").childNodes.length > 0) {
                var myNode = document.getElementById("resultbar");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
            }

            var div = document.createElement('div');
            div.setAttribute('id', 'numresults');
            div.innerHTML = results;
            document.getElementById('resultbar').appendChild(div);
            $('numresults').hide();
            $('numresults').fadeIn(500);

            count = 0
    
            $.each(data.data, function(i) {

                count++

                var currentresult = [i][0]

                var div = document.createElement('div');
                div.setAttribute('class', 'card resultcards');
                div.setAttribute('id', "card" + currentresult);
                div.setAttribute('style', 'display: none;');
                div.setAttribute('onmouseover', 'cardtoggleon("innercontainer2' + currentresult + '")');
                div.setAttribute('onmouseleave', 'cardtoggleoff("innercontainer2' + currentresult + '")');
                document.getElementById('resultbar').appendChild(div);

                $('#' + "card" + currentresult).hide();

                var div = document.createElement('div');
                div.setAttribute('class', 'container');
                div.setAttribute('style', 'padding: 0');
                div.setAttribute('id', "firstcontainer" + currentresult);
                document.getElementById("card" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'container-fluid');
                div.setAttribute('style', 'padding: 0;');
                div.setAttribute('id', "innercontainer1" + currentresult);
                document.getElementById("firstcontainer" + currentresult).appendChild(div);
                
                var div = document.createElement('div');
                div.setAttribute('class', 'container-fluid addon-card');
                div.setAttribute('id', "innercontainer2" + currentresult);
                document.getElementById("firstcontainer" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'card-body bottomcardbody');
                div.setAttribute('id', "bottomcardbody" + currentresult);
                document.getElementById("innercontainer2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "bottomrow1" + currentresult);
                document.getElementById("bottomcardbody" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "bottomrow2" + currentresult);
                document.getElementById("bottomcardbody" + currentresult).appendChild(div);

                //////////////////////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol11" + currentresult);
                document.getElementById("bottomrow1" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-4');
                div.setAttribute('id', "bottomcol12" + currentresult);
                div.innerHTML = '<label for="exampleInputEmail1">Path</label>';
                document.getElementById("bottomrow1" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol13" + currentresult);
                div.innerHTML = '<label for="exampleInputEmail1">Monitor</label>';
                document.getElementById("bottomrow1" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol14" + currentresult);
                document.getElementById("bottomrow1" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol15" + currentresult);
                document.getElementById("bottomrow1" + currentresult).appendChild(div);

                //////////////////////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol21" + currentresult);
                div.innerHTML = ''
                document.getElementById("bottomrow2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-4');
                div.setAttribute('id', "bottomcol22" + currentresult);
                div.innerHTML = '<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="/home/dan/fakepath/">';
                document.getElementById("bottomrow2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol23" + currentresult);
                div.innerHTML = '<select class="custom-select"><option selected="">All</option><option value="1">Future</option><option value="2">Missing</option><option value="3">Existing</option><option value="3">None</option></select>';
                document.getElementById("bottomrow2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol24" + currentresult);
                div.innerHTML = '<button onclick="window.open(\u0027' + data.data[i].external_link + '\u0027)" type="button" class="btn btn-primary hiddenbuts">Info <i class="far fa-question-circle"></i></button>';
                document.getElementById("bottomrow2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "bottomcol25" + currentresult);

                try {
                    string = ' (' + (((data.data[i].start_date).slice(0, 4))) + ')'
                }
                catch(error) {
                    string = " "
                }
                
                string

                div.innerHTML = '<button type="button" class="btn btn-success hiddenbuts" onclick=\u0027addcomic("' + data.data[i].title + string + '", "' + 'firstcontainer' + currentresult + '", "' + data.data[i].id + '")\u0027>Add <i class="far fa-arrow-alt-circle-down"></i></button>';
                document.getElementById("bottomrow2" + currentresult).appendChild(div);

                $('#innercontainer2' + currentresult).hide();

                //////////////////////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "cardrow" + currentresult);
                document.getElementById("innercontainer1" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "cardcol1" + currentresult);
                div.innerHTML = '<img class="card-img-top" src="' + data.data[i].poster.small + '" alt="Card image' + currentresult + 'cap" style="width: 180px; height: 100%; width: 115%;">';
                document.getElementById("cardrow" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col');
                div.setAttribute('id', "cardcol2" + currentresult);
                document.getElementById("cardrow" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "innerrow1" + currentresult);
                document.getElementById("cardcol2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'card-body');
                div.setAttribute('style', 'padding-bottom: 0px;');
                div.setAttribute('id', "innercardbody" + currentresult);
                document.getElementById("innerrow1" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'container');
                div.setAttribute('id', "innercontainer3" + currentresult);
                document.getElementById("innercardbody" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "innerrow4" + currentresult);
                document.getElementById("innercontainer3" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "innerrow5" + currentresult);
                document.getElementById("innercontainer3" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'container');
                div.setAttribute('id', "innercontainer4" + currentresult);
                document.getElementById("innerrow5" + currentresult).appendChild(div);

                ///////////////////

                var div = document.createElement('h6');
                div.setAttribute('class', 'chapter-titles');
                div.innerHTML = data.data[i].chapter_count + " Chapters";
                document.getElementById("innercontainer4" + currentresult).appendChild(div);

                ///////////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'col');
                div.setAttribute('id', "innercol3" + currentresult);
                document.getElementById("innerrow4" + currentresult).appendChild(div);

                var div = document.createElement('h5');
                div.setAttribute('class', 'comic-titles');
                div.setAttribute('id', "comictitle" + currentresult);
                document.getElementById("innercol3" + currentresult).appendChild(div);

                ///////////

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('style', 'text-align: right;');
                div.setAttribute('id', "innercol4" + currentresult);
                document.getElementById("innerrow4" + currentresult).appendChild(div);

                var div = document.createElement('h5');
                div.setAttribute('style', 'color: #b485d0; font-weight: bold;');
                div.innerHTML = data.indexer_id;
                document.getElementById("innercol4" + currentresult).appendChild(div);

                ///////////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "innerrow2" + currentresult);
                document.getElementById("cardcol2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('style', 'position: absolute; bottom: 0px;');
                div.setAttribute('id', "innerrow3" + currentresult);
                document.getElementById("cardcol2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'card-body');
                div.setAttribute('id', "tagcard" + currentresult);
                document.getElementById("innerrow3" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'container');
                div.setAttribute('id', "tagcontainer" + currentresult);
                document.getElementById("tagcard" + currentresult).appendChild(div);

                ///////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'col');
                div.setAttribute('id', "innercol5" + currentresult);
                document.getElementById("innerrow2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-1');
                div.setAttribute('id', "innercol6" + currentresult);
                document.getElementById("innerrow2" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'card-body');
                div.setAttribute('style', 'padding-top: 0px; padding-bottom: 0px;');
                div.setAttribute('id', "innercardbody2" + currentresult);
                document.getElementById("innercol5" + currentresult).appendChild(div);

                //////////////////

                var published = data.data[i].start_date
                var ongoing = data.data[i].status
                var serialization = data.data[i].serialization
                var str = data.data[i].title
                var syno = data.data[i].synopsis
                var rating = data.data[i].average_rating

                if (syno.length > 700) {
                    syno = syno.slice(0, 700);
                    syno = syno + "..."
                }


                if (published !== null) {
                    published = published.slice(0, 4);
                    str = str + ' (' + published + ')'
                }

                if (serialization !== null) {
                    str = str + '  <span class="badge badge-secondary toptag">' + serialization + '</span>'
                }

                if (ongoing !== null) {
                    if (ongoing == "finished") {
                        str = str + ' <span class="badge badge-danger toptag">Ended</span>'
                    } else {
                        str = str + '  <span class="badge badge-success toptag">Ongoing</span>'
                    }
                }

                if (rating !== null) {
                    rating = rating.slice(0,1) + "." + rating.slice(1,2)
                    str = str + ' <span class="badge badge-warning toptag">' + rating + '</span>'
                }
                
                //////////////////

                var div = document.createElement('p');
                div.setAttribute('class', 'prevsyn');
                div.setAttribute('style', 'margin: 0;');
                div.innerHTML = syno;
                document.getElementById("innercardbody2" + currentresult).appendChild(div);

                var div = document.createElement('span');
                div.setAttribute('id', "thetitle" + currentresult);
                div.innerHTML = str;
                document.getElementById("comictitle" + currentresult).appendChild(div);

                var tagcount = Object.keys(data.data[i].tags).length

                var x
                for (x = 0; x < tagcount; x++) {
                    try {
                        var div = document.createElement('span');
                        div.setAttribute('class', 'badge badge-light cattags');
                        div.innerHTML = data.data[i].tags[x];
                        document.getElementById("tagcontainer" + currentresult).appendChild(div);
                    } catch (error) {
                    }
                }

                ///////////////////////

                addtheresults('#' + "card" + currentresult);

                if (count == data.data.length) {
                    beginShow();
                }
            });
        } else {
            resetList();
        }
        stopLoad();
        searching = false
    }
    
}