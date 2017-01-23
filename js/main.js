function schimbaSlideScroll(eveniment) {
    var array=new Array();
    $("#continut>article").each(function(){
        var num=this.offsetTop-this.offsetParent.scrollTop;
        var difToCenter=$(this.parentNode).height()*0.5-num,constant;
        if(difToCenter>0) array.push(this);
    });
    if( array.length > 0 ){
        var selector=array[array.length-1].id;
        var patt1=new RegExp("([0-9]*)$");
        var item=document.querySelector("#meniu_ani #li"+patt1.exec(selector)[0]);
        if( item.className == "" ){
            var selectat = document.querySelector("#meniu_ani>.selected");
            
            if (!Modernizr.csstransitions)
            {
                $(selectat).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart").removeClass('selected');
                $(item).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart").addClass('selected');
            }
            else
            {
                selectat.className="";
                item.className="selected";
            }
        }
    };
}
function schimbaSlideClick(eveniment) {
    if(eveniment.target){
        console.log(eveniment);
        if(eveniment.target.nodeName == "A")
        {
            $('#continut').unbind('scroll', schimbaSlideScroll );
            var selectat = document.querySelector("#meniu_ani>.selected");
            if (!Modernizr.csstransitions)
            {
                $(selectat).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart").removeClass('selected');
                $(eveniment.target.parentNode).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart").addClass('selected');
            }
            else
            {
                selectat.className="";
                eveniment.target.parentNode.className="selected";
            }
            
            // scrolling catre sectiune/articol
            var patt1=new RegExp("([0-9]*)$");
            var sel=document.querySelector("#slide"+patt1.exec(eveniment.target.parentNode.id)[0]);
            $("#continut").scrollTo(sel.offsetTop+'px',2000,{easing:'easeInOutQuart',onAfter:function(){$('#continut').bind('scroll', schimbaSlideScroll );}});
        }

    };
};

function sus(eveniment){
    //console.log(eveniment.target);
};

function initalizareEvenimente() {
    $("#continut").on("click", schimbaSlideClick);
    $('#continut').bind('scroll', schimbaSlideScroll );
    $('.imagine_link').hover( derulareImagine, derulareImagineInapoi );
    $('#sus').on('click', sus );
 }   

function initializareNavigare() {

    $("#meniu_ani>#li1945").addClass("selected");
    document.getElementById("continut").className="selected";
};



$(window).load( function(eveniment){
    
    initializareNavigare();
    initalizareEvenimente();
    sus();
    setupParallax();

});
