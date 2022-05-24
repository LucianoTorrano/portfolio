const animationContainer = document.getElementById('canvas-container');
const canvas2 = document.getElementById('canvas-particle-mouse');
const bodyContainer = document.getElementById('body')
const nav2 = document.getElementById('nav');
const c2 = canvas2.getContext('2d');

canvas2.width = animationContainer.offsetWidth;
canvas2.height = animationContainer.offsetHeight;
const mouse2 = {
    x:null,
    y:null,
    positionTopImg:true,
    positionBottomImg:false
};
const particleColor= 'rgba(1,248,152,1)'
const dx= canvas2.height/canvas2.width;

let relativeMousePosX = (window.innerWidth - nav2.offsetWidth)/2;
let relativeMousePosY;

//evenlisteners

document.addEventListener('scroll',()=>{
    console.log(window.scrollY , animationContainer.offsetTop);
    relativeMousePosY = animationContainer.offsetTop - window.scrollY;
})
addEventListener('mousemove', (event)=>{
    mouse2.x = event.x - relativeMousePosX;
    mouse2.y = event.y - relativeMousePosY;
});
addEventListener('resize', ()=>{
    canvas2.width = animationContainer.offsetWidth;
    canvas2.height = animationContainer.offsetHeight;
    init2();
});
setInterval(()=>{
    mouse2.x = undefined;
    mouse2.y = undefined;
},200);

//variables
let particleArray;
const maxParticles = 60;

//class

class Particle{
    constructor(x,y,size,color1,color2,weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color1 = color1;
        this.color2=color2;
        this.weight = weight;
    }
    draw(){
        c2.beginPath();
        c2.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        if(mouse2.y>-dx*mouse2.x +canvas2.height ){
            c2.fillStyle = this.color2 ;                    
        }else c2.fillStyle = this.color1;
        c2.fill();
    }
    update(){
        this.draw();
        this.size-=0.05;
        if(this.size <0){
            this.x = mouse2.x +(( Math.random() - 0.5)*50);
            this.y = mouse2.y + ((Math.random() - 0.5)*50);    
            this.size = Math.random() *8;
            this.weight = (Math.random() *2);
        }
        this.y += this.weight;
        this.weight +=0.03;
        if(this.y > canvas2.height - this.size){
            this.weight *=-0.4;
        }
    }
}


//implementation
function init2(){
    particleArray = [];
    for(let i = 0; i<maxParticles;i++){
        let x = Math.random()*canvas2.width;
        let y = Math.random()*canvas2.height;
        let size = Math.random()*8;
        let weight = Math.random();
        let color1 = particleColor;
        let color2 = 'black';
        particleArray.push(new Particle(x,y,size,color1,color2,weight));
    }
}

function animate2(){
    requestAnimationFrame(animate2);
    c2.beginPath();
    c2.moveTo(0,0);
    c2.lineTo(canvas2.width,0);
    c2.lineTo(0,canvas2.height);
    c2.fillStyle = 'black'
    c2.fill();
    c2.beginPath();
    c2.moveTo(canvas2.width,0);
    c2.lineTo(canvas2.width,canvas2.height);
    c2.lineTo(0,canvas2.height);
    c2.fillStyle = particleColor;
    c2.fill();

    if(mouse2.y>-dx*mouse2.x +canvas2.height ){
        mouse2.positionBottomImg=true;
        mouse2.positionTopImg=false;
    }
    else if(mouse2.y<=-dx*mouse2.x +canvas2.height ){
        mouse2.positionBottomImg=false;
        mouse2.positionTopImg = true;
    }
    particleArray.forEach(particle =>{
        particle.update();
    });
    connect() 
}

init2();
animate2();

function distanceBetween(x1,y1,x2,y2){
    const xDist = x1-x2;
    const yDist = y1-y2;
    return Math.sqrt(xDist*xDist + yDist*yDist);
}

function connect(){
    let opacityValue = 1;
    for(let i = 0; i< maxParticles; i++){
        for(let j = i; j< maxParticles;j++){
            let distance = distanceBetween(particleArray[i].x,particleArray[i].y,
                                    particleArray[j].x,particleArray[j].y);
            if(distance < 100){
                opacityValue = 1 - (distance/1000);
                if(mouse2.positionBottomImg){
                    c2.strokeStyle = `rgba(0,0,0,${opacityValue})`;                    
                }
                if(mouse2.positionTopImg) c2.strokeStyle = `rgba(1,248,151,${opacityValue})`;
                c2.beginPath();
                c2.lineWidth = 1;
                c2.moveTo(particleArray[i].x,particleArray[i].y);
                c2.lineTo(particleArray[j].x,particleArray[j].y);
                c2.stroke();
            }
        }
    }
}
