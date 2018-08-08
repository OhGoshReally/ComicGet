var idlecounter
var entry
var timer_is_on = 0;
var cacheentry
function IdleSearch() {
    cacheentry = document.getElementById('myInput').value
    if (cacheentry !== "") {
        function ActualSearch(){
            startLoad()
            console.log('ActualSearch');
            
            //entry = document.getElementById('myInput').value
            //document.getElementById("bruh").innerHTML = entry;
            querySearch()
        }
        function IdleTimer(){
            if (!timer_is_on) {
                timer_is_on = 1;
                console.log('IdleTimer');
                idlecounter = setTimeout(function(){
                    ActualSearch();
                }, 750);
            }
        }
        function ResetTimer() {
            if (timer_is_on) {
                stopLoad()
                console.log('ResetTimer');
                clearTimeout(idlecounter);
                timer_is_on = 0;
            }
        }
        ResetTimer()
        IdleTimer()
    } else {
        resetList();
    }
}