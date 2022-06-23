const menuRespBtn = document.querySelector('.menu-btn-box');
const navActive = document.querySelector('.nav-options-list');
const navItemList = document.querySelectorAll('.nav-options-item');
const navLinks = document.querySelectorAll('.nav-options-item a');

menuRespBtn.onclick = ()=>{
	//menu responsive deployment
	menuRespBtn.classList.toggle('active');
	navActive.classList.toggle('nav-active');

	//menu links fade animation
	linkFade(navItemList);

}

navItemList.forEach(link =>{
	link.onclick = ()=>{
		if(menuRespBtn.classList.contains('active') && navActive.classList.contains('nav-active')){
			setTimeout(()=>{
			navActive.classList.toggle('nav-active');
			menuRespBtn.classList.toggle('active');
			linkFade(navItemList)},200);
		}
	}
	
})

function linkFade(linkList){
	linkList.forEach((link,index)=>{
		if(link.style.animation){
			link.style.animation = '';
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${index / 4 + .5}s`
		}
	})
}