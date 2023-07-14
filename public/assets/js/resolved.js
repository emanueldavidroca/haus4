let rating_btn = document.querySelectorAll(".rating-btn");
let set_star = false;
rating_btn.forEach((btn)=>{
    if(!btn.parentNode.hasAttribute('data-rated')){
        btn.addEventListener("mouseover",()=>{rating_mouseover(btn)});
    }
    btn.addEventListener("click",()=>{rating_click(btn)});
});
function rating_mouseover(element){
    if(set_star == true) return; 
    

    let star = element.value;
    for(let i = 1; i < (star);i++){
        if(i < 6){
            document.querySelector(".rating_"+i+" i").classList.add("fa-solid");
            document.querySelector(".rating_"+i+" i").classList.remove("fa-regular");
        }
    }
    document.querySelector(".rating_"+star+" i").classList.add("fa-solid");
    document.querySelector(".rating_"+star+" i").classList.remove("fa-regular");
    star++;
    if(star < 6){
        for(;star < 6;star++){
            document.querySelector(".rating_"+star+" i").classList.add("fa-regular");
            document.querySelector(".rating_"+star+" i").classList.remove("fa-solid");
        }
    }    
}
function rating_click(element){
    set_star = true;  
    let star = element.value;
    document.querySelector("#send-rating").classList.remove("disabled");
    for(let i = 1; i < (star);i++){
        if(i < 6){
            document.querySelector(".rating_"+i+" i").classList.add("fa-solid");
            document.querySelector(".rating_"+i+" i").classList.remove("fa-regular");
        }
    }
    document.querySelector(".rating_"+star+" i").classList.add("fa-solid");
    document.querySelector(".rating_"+star+" i").classList.remove("fa-regular");

    document.querySelector("#rating_value").value =  star;
    star++;
    if(star < 6){
        for(;star < 6;star++){
            document.querySelector(".rating_"+star+" i").classList.add("fa-regular");
            document.querySelector(".rating_"+star+" i").classList.remove("fa-solid");
        }
    } 
    
}