/*
Autor: Alex Imbrea
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