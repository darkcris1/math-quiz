const themeCircleBtn = document.getElementsByClassName('circle'),
      themePacks = document.getElementsByClassName('themePack')[0],
      lock = document.getElementsByClassName('lock'),
      test = document.getElementsByClassName('test')[0],
	  bodyElement = document.body;
for (let i = 0; i < themeCircleBtn.length; i++) {
	themeCircleBtn[i].addEventListener("click",function(event){
		event.stopPropagation();
		if (event.target !== this) {
			return;
		}
		bodyElement.style.background = this.style.background;
	});
}
function theme(){
	themePacks.classList.toggle("show");
}
themePacks.onclick = function(event){
	themePacks.classList.toggle("show");
}

for (let i = 0; i < lock.length; i++) {
	lock[i].addEventListener("click",function(){
		if (moneys >= 100) {
			this.parentElement.innerHTML = "";
			moneys -= 100;
			money.innerHTML = moneys;
			alert("Purchase Successful");
		}else{
			alert("You need 100$ to buy this theme");
		}
	});
}
