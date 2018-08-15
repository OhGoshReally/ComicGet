function newQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('headertext2').innerHTML = quotes[randomNumber];
}
newQuote()
$("#submenudiv").hide();
$("#menu-Home").hide();
$("#menu-Library").hide();
$("#menu-Wanted").hide();
$("#menu-Settings").hide();
$("#menu-System").hide();
$("#submenuoptions").hide();
$("#submenuoptions2").hide();