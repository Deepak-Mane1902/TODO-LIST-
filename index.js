const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");
const getLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem("DATA"));
}

const addTodoLocalStorage=(localArr)=>{
    return localStorage.setItem("DATA",JSON.stringify(localArr) )
}

let  localArr = getLocalStorage() || [];

const addTodoDynamicElement =(curEle)=>{
    const divElem = document.createElement("div");
    divElem.classList.add('main_todo_div');
    divElem.innerHTML = `<li> ${curEle} </li><button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElem)
};      


const addTodo = (e)=>{
    e.preventDefault();
    const todoListValue = inputValue.value.trim();
    inputValue.value = ""
    if(todoListValue !== ""){
    if( todoListValue !== ""  && !localArr.includes(todoListValue)){
        localArr.push(todoListValue)
        localArr = [...new Set(localArr)];
        console.log(localArr);
        localStorage.setItem("DATA",JSON.stringify(localArr))
        
        addTodoDynamicElement(todoListValue);
    }
    else{
        console.error("Duplicate Name's Not Allowed..!!!")
        return alert("Duplicate Not Allowed.!!")
        
    }
}   
    else{
        console.error("You Cannot Add Empty Space.!!")
        return alert("You Cannot Add Empty Space.!!")
        
    }
    

}


const showTodoList =()=>{
    console.log(localArr);
    localArr.forEach((curEle) =>{
        addTodoDynamicElement(curEle);
    });  

}
showTodoList();

const removeTodo=(e)=>{
    // console.log(e.target);
    const todoToRemove = e.target;
    let todoRemoveContent = todoToRemove.previousElementSibling.innerText;
    todoRemoveContent.toLowerCase();
    let parentElem = todoToRemove.parentElement;
    console.log(todoRemoveContent);

    localArr = localArr.filter((cureEle)=>{
        return cureEle !== todoRemoveContent;
    });
    

    addTodoLocalStorage(localArr);
    parentElem.remove()

    
    console.log(localArr);
    
}



mainTodoElem.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")){
        removeTodo(e);
    }
    
})

document.querySelector(".btn").addEventListener('click', (e)=>{
    addTodo(e);
})


