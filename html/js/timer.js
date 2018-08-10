var inputtimeout = 500
var idlecounter
var cacheentry
var entry
var timer_is_on = 0;
var searching = false
var searched = false
function IdleSearch() {
    if (searching == true) {
        console.log("Slo User " + inputtimeout);
        inputtimeout += 250
    };
    if (cacheentry ==  document.getElementById('myInput').value) {
        return;
    } else if (searched === true ){
        console.log("reset")
        resetList();
    }
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
                    searching = true
                    searched = true
                    ActualSearch();
                }, inputtimeout);
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