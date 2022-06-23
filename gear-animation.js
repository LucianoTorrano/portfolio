const tuercaImg = document.getElementById('gear-big');
const tuercaImgMedium = document.getElementById('gear-medium');
const tuercaImgSmall = document.getElementById('gear-small');
const container = document.getElementById('home');
const body = document.getElementById('body');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const nav = document.querySelector('nav');

canvas.width = body.offsetWidth;
canvas.height = container.offsetHeight*2;

let relativeGearPosX = (canvas.width - nav.offsetWidth)/2;
let relativeMousePosY2=0;

document.addEventListener('scroll', ()=>{
    relativeMousePosY2 = body.offsetTop - window.scrollY;
})

window.addEventListener('resize',()=>{
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    relativeGearPosX = (canvas.width - nav.offsetWidth)/2;
    tuercas.forEach(tuerca =>{
        tuerca.x = tuerca.initX + relativeGearPosX;
        tuerca.y = tuerca.initY;
    })
})

const mouse = {
    x: null,
    y: null,
    radius : 100
}
const returnSpeed = 60;
const densityFraction = 10;
const movementSpeed = .5;

addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y - relativeMousePosY2;
});

class ObjectBG{
    constructor({image,x,y,speed=0,range=0}){
        this.x=x +image.width/2;
        this.y=y + image.height/2;
        this.initX = x;
        this.initY = y;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.size = image.width;
        this.density = densityFraction;
        this.movement = {
            speed: speed,
            range: range,
        }
        this.initRange = range;
    }
    draw(){
        c.drawImage(this.image,this.x - this.image.width/2.5,this.y-this.image.height/2.5);
        
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = 4*dx/distance;
        let forceDirectionY = 4*dy/distance;

        const maxDistance = 200;
        let force = (maxDistance - distance)/maxDistance;
        if(force<0)force = 0;

        let directionX = (forceDirectionX*force*this.density);
        let directionY = (forceDirectionY*force*this.density);

        if(distance < mouse.radius +this.size){
            this.x -=directionX;
            this.y -=directionY;
        }else{
            if(this.x !== this.initX){
                let dx = this.x -this.initX;
                this.x -= dx/returnSpeed;
            }
            if(this.y !== this.initY){
                let dy = this.y - this.initY;
                this.y -=dy/returnSpeed;
            }
        }
        this.draw();
    }
}
let tuercas = [new ObjectBG({image:tuercaImg,x:320+relativeGearPosX,y:550,speed:.5,range:130}),
              new ObjectBG({image:tuercaImgMedium,x:200+relativeGearPosX,y:750,speed:.6,range:90}),
              new ObjectBG({image:tuercaImg,x:50+relativeGearPosX,y:600,speed:.3,range:110}),
              new ObjectBG({image:tuercaImgMedium,x:700+relativeGearPosX,y:300,speed:.2,range:130}),
              new ObjectBG({image:tuercaImg,x:900+relativeGearPosX,y:200,speed:.25,range:110})];

function animate(){
    requestAnimationFrame(animate);
    c.fillRect(0,0,canvas.width,canvas.height);

    tuercas.forEach(tuerca =>{
        tuerca.update();
        tuerca.y -=tuerca.movement.speed;
        tuerca.movement.range -= tuerca.movement.speed;
        if(tuerca.movement.range <= 0 || Math.abs(tuerca.movement.range) >= tuerca.initRange){
            tuerca.movement.speed *=-1;
        }
    })
}
animate();