let scrollbar = document.querySelector('.scrollablebuttons')

window.addEventListener('load',()=>{
    console.log('scrollY',window.scrollY)
    console.log((scrollbar.getBoundingClientRect().top)+(window.scrollY))
    document.documentElement.style.setProperty('--arrowpos',(scrollbar.getBoundingClientRect().top+(window.scrollY))+'px')
})