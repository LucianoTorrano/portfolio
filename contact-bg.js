window.addEventListener('load',()=>{
    const contactContainer = document.getElementById('contact');
const canvasBg = document.getElementById('canvas-contact');
const context = canvasBg.getContext('2d');

canvasBg.width  = contactContainer.offsetWidth;
canvasBg.height = contactContainer.offsetHeight;

const contactBgColor= '#1ED48E';

addEventListener('resize',()=>{
    canvasBg.width  = contactContainer.offsetWidth;
    canvasBg.height = contactContainer.offsetHeight;
    drawBg();
})

function drawBg(){
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasBg.width,0);
    context.lineTo(0,canvasBg.height);
    context.fillStyle = contactBgColor;
    context.fill();
}
drawBg();
})