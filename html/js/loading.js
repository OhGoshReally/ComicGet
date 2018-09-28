function startLoad(){
    var div = document.createElement('div');
    div.setAttribute('class', 'container');
    div.setAttribute('id', 'loaddiv');
    document.getElementById('loadbar').appendChild(div);
    var div = document.createElement('i');
    div.setAttribute('class', 'fas fa-sync-alt rotating');
    div.setAttribute('id', 'loadingicon');
    document.getElementById('loaddiv').appendChild(div);
    $("#loaddiv").hide();
    $("#loadingicon").hide();
    $("#loaddiv").show(150, function(){
        $("#loadingicon").show(150)
    });
}
function stopLoad(){
    $("#loadingicon").hide(150, function(){
        $("#loaddiv").hide(150, function(){
            if (document.getElementById('loadingicon')) {
                var element = document.getElementById('loadingicon');
                element.remove(element);
            }
            if (document.getElementById('loaddiv')) {
                var element = document.getElementById('loaddiv');
                element.remove(element);
            }
        });
    });
}