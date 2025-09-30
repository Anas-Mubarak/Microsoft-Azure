 document.querySelectorAll('.scrollablebuttons')
let shadowcontainer = document.querySelectorAll('.scrollshadow')
let scrollbar = document.querySelectorAll('.scrollbar')
let animationdone
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

function initialize()
{
    document.querySelectorAll('.shrinklist').forEach((el)=>{
        shrinkorexpand(el,0)
    })
}

function classtoggler(ref,operation,cl){
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
    // console.log('exit i',i)
}

function disablefunction(timeout)
{
    animationdone = 0
    setTimeout(() => {
        animationdone = 1
    }, timeout);
}

function main(){
    document.querySelector('.closebutton').addEventListener('click',()=>{
        document.querySelector('.popup').classList.add('hideelement')
    })

    document.querySelectorAll('.bscroll').forEach((obj)=>{
        document.querySelectorAll('.defaultselect').forEach((df)=>df.classList.add('selecteditem')) 
        obj.addEventListener('click',(objs)=>{
        objs.target.classList.add('selecteditem')
        console.log(objs)
        let current = objs.target
        sibling_selector(current,'previousElementSibling')
        sibling_selector(current,'nextElementSibling')
    })
    }) 

    initialize()
    animationdone = 1
    scrollbar.forEach(element => {
        let arrowcontainer = element.parentElement
        let shadowcontainer = arrowcontainer.parentElement
        classtoggler([arrowcontainer,shadowcontainer],'add',['sr','shr'])
        element.addEventListener('scroll',(e)=>{
        if(e.target.scrollLeft>0)
        {
            console.log('scrolled')
            classtoggler([arrowcontainer,shadowcontainer],'add',['sl','shl'])
            if(e.target.scrollLeft === e.target.scrollWidth-e.target.clientWidth)
            {
                classtoggler([arrowcontainer,shadowcontainer],'remove',['sr','shr'])
            }
            else{
                classtoggler([arrowcontainer,shadowcontainer],'add',['sr','shr'])
            }
        }
        else{
            classtoggler([arrowcontainer,shadowcontainer],'remove',['sl','shl'])
        } 
        console.log(e.target.scrollLeft)
        console.log('scrollwidth',e.target.scrollWidth-e.target.clientWidth)
    })
    });

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
        // let height = current.getBoundingClientRect()
        // console.log(height)
        // current.style.height = height
    }) 
}