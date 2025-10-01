 document.querySelectorAll('.scrollablebuttons')
let shadowcontainer = document.querySelectorAll('.scrollshadow')
let scrollbar = document.querySelectorAll('.scrollbar')
let animationdone
let scrollbar2 = document.querySelectorAll('.scrollbar2')

window.addEventListener('load',()=>{
    main()
})

function sibling_selector(current,ref,classname)
{
    while(current[ref])
    {
        current = current[ref]
        current.classList.remove(classname)
    }
}

function initialize()
{
    document.querySelectorAll('.shrinklist').forEach((el)=>{
        shrinkorexpand(el,0)
    })
}

function classtoggler(ref,operation,cl){
    console.log(ref,operation,cl)
    let i=0
    ref.forEach(element => {
        element.classList[operation](cl[i])
        i++
    });
}

function shrinkorexpand(current,flg)
{
    animationdone = 0
    let i=0
    let minusheight = [...current.children].slice(1).reduce((acc,val)=>
    {
        return acc+val.getBoundingClientRect().height
    },72)
    // console.log('minusheight',minusheight)
    // console.log('entry i',i)
    while(i<=minusheight)
    {
        if(flg)
        {
            current.style.height = current.getBoundingClientRect().height + i
            // console.log(`${Math.min(180,181*i/minusheight)}deg`)
            current.style.setProperty('--ang',`${Math.min(180,181*i/minusheight)}deg`)
        }
        else{
            current.style.height = current.getBoundingClientRect().height - i
            // console.log('--ang',`${Math.min(360,360-(180*i/minusheight))}deg`)
            current.style.setProperty('--ang',`${Math.min(360,360-((360-i)*i/minusheight))}deg`)
        }
        i++
    }
    if(flg){
        current.style.height = current.getBoundingClientRect().height + minusheight
    }
    else{
        current.style.height = current.getBoundingClientRect().height - minusheight
    }
}

function disablefunction(timeout)
{
    animationdone = 0
    setTimeout(() => {
        animationdone = 1
    }, timeout);
}

function buttontoggler(mainclass,selectionkey){
    document.querySelectorAll('.'+mainclass).forEach((obj)=>{
        obj.addEventListener('click',(objs)=>{
        objs.target.classList.add(selectionkey)
        console.log(objs)
        let current = objs.target
        sibling_selector(current,'previousElementSibling',selectionkey)
        sibling_selector(current,'nextElementSibling',selectionkey)
    })
    })
}

function arrowhandler(mainclass,rel,lclasses,rclasses){
    mainclass.forEach(element => {
    let arrowcontainer = [element[rel[0]]]
    if(rel[1])
    {
        arrowcontainer.push(arrowcontainer[0][rel[1]])
    }
        classtoggler([...arrowcontainer],'add',rclasses)
        element.addEventListener('scroll',(e)=>{
        if(e.target.scrollLeft>0)
        {
            console.log('scrolled')
            classtoggler([...arrowcontainer],'add',lclasses)
            if(e.target.scrollLeft === e.target.scrollWidth-e.target.clientWidth)
            {
                classtoggler([...arrowcontainer],'remove',rclasses)
            }
            else{
                classtoggler([...arrowcontainer],'add',rclasses)
            }
        }
        else{
            classtoggler([...arrowcontainer],'remove',lclasses)
        } 
        console.log(e.target.scrollLeft)
        console.log('scrollwidth',e.target.scrollWidth-e.target.clientWidth)
    })
    })
}

function main(){
    document.querySelector('.closebutton').addEventListener('click',()=>{
        document.querySelector('.popup').classList.add('hideelement')
    })

    buttontoggler('bscroll','selecteditem')
    buttontoggler('scrollcontent','selectedscroll')

    initialize()
    animationdone = 1

    arrowhandler(scrollbar,['parentElement','parentElement'],['sl','shl'],['sr','shr'])
    arrowhandler(scrollbar2,['nextElementSibling'],['ib'],['ir'])

    document.querySelectorAll('.lihead').forEach(element => {
            element.addEventListener('click',(e)=>{
            if(animationdone)
            {
                let current = e.target.parentElement
                current.classList.toggle('shrinklist')
                console.log('toggled') 
                disablefunction(1600)
                if(current.classList.contains('shrinklist'))
                {
                    shrinkorexpand(current,0)
                }
                else{
                    shrinkorexpand(current,1)
                }
            }})
    }) 
}