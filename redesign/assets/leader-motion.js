(()=>{
  const gsap=window.gsap, ST=window.ScrollTrigger;
  if(!gsap||!ST)return;
  gsap.registerPlugin(ST);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
    const hero=document.querySelector('.hero');
    if(hero){
      const intro=hero.querySelectorAll('.badge-row,h1,.sub,.btns');
      gsap.from(intro,{opacity:0,y:24,duration:.85,stagger:.12,ease:'power3.out',clearProps:'opacity,transform'});
      const photo=hero.querySelector('.hero-photo');
      if(photo)gsap.from(photo,{opacity:0,duration:1.25,delay:.15,ease:'power2.out',clearProps:'opacity'});
    }
    document.querySelectorAll('.page>section:not(.hero)').forEach(section=>{
      const elements=section.querySelectorAll('.eyebrow,h2,.event-heading .lead,.card,.numbers-card,.pain>div,.event-grid figure,.bio-photo,.price,.vip,.faq,.ag');
      elements.forEach((el,i)=>{
        if(el.getBoundingClientRect().bottom<0)return;
        gsap.from(el,{opacity:0,y:26,duration:.7,delay:el.matches('.card,.numbers-card,.event-grid figure')?(i%3)*.07:0,ease:'power2.out',clearProps:'opacity,transform',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
      });
    });
    const revealFocused=e=>{gsap.getTweensOf(e.target.closest('.card,.numbers-card,.faq,.ag')||e.target).forEach(t=>t.progress(1));};
    document.addEventListener('focusin',revealFocused);
    const onCarousel=e=>{
      const cards=[...e.target.children].sort((a,b)=>Number(a.style.order)-Number(b.style.order));
      gsap.fromTo(cards,{opacity:.25,x:e.detail.direction*18},{opacity:1,x:0,duration:.4,stagger:.045,ease:'power2.out',overwrite:true,clearProps:'opacity,transform'});
    };
    document.addEventListener('proof:change',onCarousel);
    return()=>{document.removeEventListener('focusin',revealFocused);document.removeEventListener('proof:change',onCarousel);gsap.killTweensOf('.proof-card');gsap.set('.proof-card',{clearProps:'opacity,transform'});};
  });
  const refresh=()=>ST.refresh();
  if(document.readyState==='complete')refresh();else window.addEventListener('load',refresh,{once:true});
  if(document.fonts)document.fonts.ready.then(refresh);
})();
