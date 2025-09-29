let arrowcontainer = document.querySelector('.scrollablebuttons')
let shadowcontainer = document.querySelector('.scrollshadow')
let scrollbar = document.querySelector('.scrollbar')
// let arrowcontainer = document.querySelector('')

window.addEventListener('load',()=>{
    main()
})

function sibling_selector(current,ref)
{
    while(current[ref])
    {
        current = current[ref]
        current.classList.remove('selecteditem')
    }
}

function classtoggler(ref,operation,cl){
    let i=0
    ref.forEach(element => {
        element.classList[operation](cl[i])
        i++
    });
}

function main(){
    document.querySelector('.closebutton').addEventListener('click',()=>{
        document.querySelector('.popup').classList.add('hideelement')

    })

    document.querySelectorAll('.bscroll').forEach((obj)=>{
        document.querySelector('.defaultselect').classList.add('selecteditem')
        obj.addEventListener('click',(objs)=>{
        objs.target.classList.add('selecteditem')
        console.log(objs)
        let current = objs.target
        sibling_selector(current,'previousElementSibling')
        sibling_selector(current,'nextElementSibling')
    })
    }) 

    classtoggler([arrowcontainer,shadowcontainer],'add',['sr','shr'])
    // arrowcontainer.classList.add('sr')
    // shadowcontainer.classList.add('shr')
    scrollbar.addEventListener('scroll',(e)=>{
        if(e.target.scrollLeft>0)
        {
            classtoggler([arrowcontainer,shadowcontainer],'add',['sl','shl'])
            // arrowcontainer.classList.add('sl')
            // shadowcontainer.classList.add('shl')
            if(e.target.scrollLeft === e.target.scrollWidth-e.target.clientWidth)
            {
                console.log('remv')
                arrowcontainer.classList.remove('sr')
                shadowcontainer.classList.remove('shr')
            }
            else{
                arrowcontainer.classList.add('sr')
                shadowcontainer.classList.add('shr')
            }
        }
        else{
                arrowcontainer.classList.remove('sl')
                shadowcontainer.classList.remove('shl')
        } 
        console.log(e.target.scrollLeft)
        console.log('scrollwidth',e.target.scrollWidth-e.target.clientWidth)
    })
}