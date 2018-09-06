function bigPageOn(chosen){
    $("#bigPageFrame").attr('src','/static/library/img/'+$(chosen).find(".comic-id")[0].innerText+'/index.html')
    $("body").css('overflow','hidden');
    $("#menuoptions").children().removeClass("active")
    $("#menudiv").fadeTo(150, 0.15);
    $("#submenudiv").animate({
        height: "0px"
    },150,function(){
        $("#submenudiv").css('position','absolute');
        $("#submenudiv").hide();
        $("#menudiv").css('position','absolute');
    });
    $("#realheader").animate({
        height: "0px",
        paddingTop: "0px",
        paddingBottom: "0px"
    },150, function(){
        $("#realheader").hide();
    });
    $("#smallPage").fadeOut(150, function(){
        $("#bigPageFrame").fadeIn(150,function(){
            
        });
    });
    hoverMenu()
}

function bigPageOff(){
    $("#bigPageFrame").removeAttr('src')
    $("body").css('overflow','');
    $("#menudiv").fadeTo(150, 1);
    $("#realheader").show(0,function(){
        $("#realheader").animate({
            height: "153px",
            paddingTop: "22px",
            paddingBottom: "22px"
        },150, function(){
            $("#menudiv").css('position','')
            $("#submenudiv").css('position','');
            $("#menudiv").stop().animate({
                opacity: "1"
            },150);
            $("#submenudiv").show(0,function(){
                $("#submenudiv").animate({
                    height: "40px"
                },150);
            });
        });
    });
    $("#bigPageFrame").fadeOut(150, function(){
        $("#smallPage").fadeIn(150);
    });
}