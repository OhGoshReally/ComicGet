function newQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('headertext2').innerHTML = quotes[randomNumber];
}
newQuote()

$("#menu-Library").hide();
$("#menu-Activity").hide();
$("#menu-Wanted").hide();
$("#menu-Settings").hide();
$("#menu-System").hide();

$("#submenu-Add").hide();
$("#submenu-Logs").hide();
$("#submenu-Backup").hide();
$("#submenu-Tasks").hide();
$("#submenu-Updates").hide();
$("#submenu-Profiles").hide();
$("#submenu-Quality").hide();
$("#submenu-Indexers").hide();
$("#submenu-Connect").hide();
$("#submenu-Metadata").hide();
$("#submenu-General").hide();
$("#submenu-UI").hide();
$("#submenu-Cutoff-Unmet").hide();
$("#submenu-History").hide();
$("#submenu-Blacklist").hide();

$("#submenuoptions-settings").hide();
$("#submenuoptions-system").hide();
$("#submenuoptions-activity").hide();
$("#submenuoptions-wanted").hide();
