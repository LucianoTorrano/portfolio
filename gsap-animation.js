let tl = gsap.timeline({defaults: {ease:"power4.inOut",duration:2}});

tl.to('.gsap-title', { clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',opacity:1,y:0,duration:2.2})
  .to('.gsap-button',{ opacity:1,y:0,duration:1},'-=1')
  .to('.splash-bg',{ opacity:1,duration:.5},'-=.5')
  .to('.banner-img',{ opacity:1,duration:.5},'-=.3')
  .to('.gear-canvas',{ opacity:1,duration:.5},'-=.3')

/* SCROLL TRIGGER */
gsap.registerPlugin(ScrollTrigger);
gsap.from(".about",{
    scrollTrigger:{
        trigger:".about",
        ease: Power2.easeOut,
        toggleActions: "play none restart pause",
        start:"top center"
    }, 
    opacity:0,
    filter:'blur(10px)',
    duration:1
});

gsap.from(".work1",{
    scrollTrigger:{
        trigger:".work1",
        ease: Power2.easeOut,
        toggleActions: "play pause restart pause",
        start:"top 80%"
    }, 
    opacity:0,
    filter:'blur(10px)',
    duration:1
})
gsap.from(".work2",{
    scrollTrigger:{
        trigger:".work2",
        ease: Power2.easeOut,
        toggleActions: "play pause restart pause",
        start:"top 80%"
    }, 
    opacity:0,
    filter:'blur(10px)',
    duration:1
})
gsap.from(".work3",{
    scrollTrigger:{
        trigger:".work3",
        ease: Power2.easeOut,
        toggleActions: "play pause restart pause",
        start:"top 80%"
    }, 
    opacity:0,
    filter:'blur(10px)',
    duration:1
})
