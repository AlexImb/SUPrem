/*
Autor: Alex Imbrea
Setari pentru lazy loading---este folosit pentru imaginile de pe slide-urile 2,3,4,...

*/
 $(function() {
	$("img").lazyload({         
     container: $("#continut"),
     threshold:2500,
     failure_limit : 10


		});
  });
