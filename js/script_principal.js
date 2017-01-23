/*
Autor: Alex Imbrea

In acest script sunt apelate functiile din plugin-uri si realizat meniul de navigare.
*/

//schimba intrarea selectata din meniu in functie de slide-ul la care se face scroll
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
            var selectat = document.querySelector("#meniu_ani>.selectat");
            
            if (!Modernizr.csstransitions)
            {
                $(selectat).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart").removeClass('selectat');
                $(item).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart").addClass('selectat');
            }
            else
            {
                selectat.className="";
                item.className="selectat";
            }
        }
    };
}

//derulazeaza la slide-ul ales din meniu cand se face click pe unde dintre intrararile din meniu
function schimbaSlideClick(eveniment) {
    if(eveniment.target){
        if(eveniment.target.nodeName == "A") //testeaza daca se executa click pe un link <a...</a>
        {
            $('#continut').unbind('scroll', schimbaSlideScroll );
            var selectat = document.querySelector("#meniu_ani>.selectat"); //variabila selectat primeste valoarea aleasea de user
            if (!Modernizr.csstransitions)
            {
                $(selectat).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart").removeClass('selectat');
                $(eveniment.target.parentNode).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart").addClass('selectat');
            }
            else
            {
                selectat.className="";
                eveniment.target.parentNode.className="selectat";
            }
            
            // realizeaza scroll  catre sectiunea/articolul selectat 
            var patt1=new RegExp("([0-9]*)$");
            var sel=document.querySelector("#slide"+patt1.exec(eveniment.target.parentNode.id)[0]);
            $("#continut").scrollTo(sel.offsetTop+'px',2000,{easing:'easeInOutQuart',onAfter:function(){$('#continut').bind('scroll', schimbaSlideScroll );}});
        }

    };
};


//apeleaza functiile potrivite in functie de actiunile efectuate
function initalizareEvenimente() {
    $("#continut").on("click", schimbaSlideClick);
    $('#continut').bind('scroll', schimbaSlideScroll );
    $('.imagine_link').hover( derulareImagine, derulareImagineInapoi );

 }   

//marcheaza ca fiind selectata prima intrare din meniul de navigare inainte de a se realiza scroll sau click;
function initializareNavigare() {
    $("#meniu_ani>#li1945").addClass("selectat");
    document.getElementById("continut").className="selectat";
};


//apelarea celor trei functii
$(window).load( function(eveniment){
    initializareNavigare();
    initalizareEvenimente();
    setupParallax(); //apelarea functiei setupPrallax() din parallax.js
});


/*
Autor: Alex Imbrea

Creeaza aspectul de timeline si derularea imaginilor
*/
function derulareImagine(e) { // initializare functie derulare imagine pentru a vedea textul
    var dimenisune=$(e.currentTarget).innerWidth()*-0.5; //calculeaza dimensiunea impratind latimea imaginii la 2
    var comanda;
    switch( e.currentTarget.parentNode.parentNode.className ){ //foloseste clasa imaginii pentru a vedea daca este in stanga sau in dreapta
        case "imagini_stanga": //daca este in stanga scade marginea din stanga(variabila dimensiune este negativa)
            comanda={marginLeft:dimenisune+'px'}; 
            break;
        case "imagini_dreapta": //daca este in dreapta scade marginea din dreapta
            comanda={marginRight:dimenisune+'px'};
            break;
        default:
            return false;
            break;
    }
    $(e.currentTarget).stop(true,true).animate(comanda,300,"easeInOutQuart"); //animare derulare
}

function derulareImagineInapoi(e) { //intializare functie pentru a derula imaginea inapoi
    var comanda;
    switch( e.currentTarget.parentNode.parentNode.className ){ 
        case "imagini_stanga": //reface marginea imaginii din stanga la 0px (pozitia initiala);
            comanda={marginLeft:'0px'};
            break;
        case "imagini_dreapta": //reface marginea imaginii din dreapta la 0px (pozitia initiala);
            comanda={marginRight:'0px'};
            break;
        default:
            return false;
            break;
    }
    $(e.currentTarget).stop(true,true).animate(comanda,300,"easeInOutQuart"); //animare derulare inapoi
}

//ambele functii sunt apelate in scriptul principal in intializareEvenimente();


/*
Autor: Alex Imbrea
Setari pentru lazy loading---este folosit pentru imaginile de pe slide-urile 2,3,4,...

*/
$(function() {
    $("img").lazyload({container: $("#continut"),threshold:1000, failure_limit:5});
});
/*
Autor: Alex Imbrea
Setari pentru pre=loader-este folosit pentru imaginile de pe slide-ul 1 si obiectele flotante
*/
$(document).ready(function (e) {
     $("body").queryLoader2({
        //backgroundImage: "../img/ui/load.png",
        barColor: "#ff0000",
        backgroundColor: "#000000",
        percentage: true,
        barHeight: 0,
        completeAnimation: "ease"
    });
});
