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
