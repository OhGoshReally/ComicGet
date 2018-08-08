function querySearch(){

    var entry = document.getElementById('myInput').value
    var entry = entry.replace(/[ ]/igm, "%20");

    var url = 'https://kitsu.io/api/edge/manga?filter[text]='
    var queryurl= url + entry
    var results = ''

    $.getJSON(queryurl, callbackFuncWithData);

    function callbackFuncWithData(data){

        if (data["data"].length > 0) {
            results = "<h5>Found " + data["data"].length + " results.</h5>"
            
            var div = document.createElement('div');
            div.setAttribute('id', 'numresults');
            div.innerHTML = results;
            document.getElementById('resultbar').appendChild(div);
            $('numresults').hide();
            $('numresults').fadeIn(500);
    
            $.each(data["data"], function(i) {

                var currentresult = [i][0]

                var div = document.createElement('div');
                div.setAttribute('class', 'card resultcards');
                div.setAttribute('id', "card" + currentresult);
                document.getElementById('resultbar').appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'card-body');
                div.setAttribute('id', "cardbody" + currentresult);
                document.getElementById("card" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'container');
                div.setAttribute('id', "innercontainer" + currentresult);
                document.getElementById("cardbody" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'row');
                div.setAttribute('id', "cardrow" + currentresult);
                document.getElementById("innercontainer" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-2');
                div.setAttribute('id', "cardcol1" + currentresult);
                document.getElementById("cardrow" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col');
                div.setAttribute('id', "cardcol2" + currentresult);
                document.getElementById("cardrow" + currentresult).appendChild(div);

                var div = document.createElement('div');
                div.setAttribute('class', 'col-1');
                div.setAttribute('id', "cardcol3" + currentresult);
                document.getElementById("cardrow" + currentresult).appendChild(div);

                //////////////////

                var div = document.createElement('div');
                div.setAttribute('class', 'card');
                div.setAttribute('id', "cardimg" + currentresult);
                div.innerHTML = '<img class="card-img-top" src="' + data["data"][i].attributes.posterImage.small + '" alt="Card image' + currentresult + 'cap">';
                document.getElementById("cardcol1" + currentresult).appendChild(div);

                var published = data["data"][i].attributes.startDate
                if (published !== null) {
                    var published = published.slice(0, 4);
                    var str = "<h5>" + data["data"][i].attributes.canonicalTitle + ' (' + published + ')' + "</h5><p>" + data["data"][i].attributes.synopsis + "</p>"
                } else {
                    var str = "<h5>" + data["data"][i].attributes.canonicalTitle + "</h5><p>" + data["data"][i].attributes.synopsis + "</p>"
                }
                var div = document.createElement('div');
                div.setAttribute('class', 'container');
                div.setAttribute('id', "result" + currentresult);
                div.innerHTML = str;
                document.getElementById("cardcol2" + currentresult).appendChild(div);

                $('#' + "result" + currentresult).hide();
                $('#' + "result" + currentresult).fadeIn(500);
            });
        } else {
            resetList();
        }
        stopLoad();
    }
    

    
/*
    $.each(json_data["responseJSON"]["data"], function(i) {
        console.log(json_data["responseJSON"]["data"][i].attributes.canonicalTitle);
    });

    $.each(json_data, function(i) {
        console.log(json_data[i].attributes.canonicalTitle);
      }); */

}