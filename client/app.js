const todosContainer = document.querySelector(".todos")
console.log(todosContainer)

const todoGet = ()=>{
    console.log("todoGet")
    fetch("http://localhost:3030/todoget")
    .then((res)=>res.json())
    .then((todos)=>{
        console.log("todos" , todos.message)
        const allTodos = todos.response
        for(var i =0 ; i <allTodos.length - 1; i++){
            const todoId= allTodos[i]._id
            const todoTask= allTodos[i].newTask
           
            todosContainer.innerHTML += `  <span> ${todoTask} </span>
            <button>Edit</button>
            <button>Delete</button>`
        }
    })
    .catch((err)=>{
        console.log("error" , err)
    })
}

const todoCreate = ()=>{
    console.log("todoGet")
    fetch("http://localhost:3030/todocreate")
    .then((res)=>res.json())
}