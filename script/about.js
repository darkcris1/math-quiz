const about = document.getElementsByClassName('about')[0],
	  aboutCont = document.getElementsByClassName('aboutCont')[0];
about.addEventListener("click",showAbout);
aboutCont.addEventListener("click",function(e){
	if (e.target !== this) {
		return;
	}
	showAbout();
});
function showAbout(){
	aboutCont.classList.toggle("show");
}