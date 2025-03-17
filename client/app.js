const todosContainer = document.querySelector(".todos")
const inputTodo = document.querySelector("#inputTodo")

console.log(todosContainer)

const todoGet = () => {
    console.log("todoGet")
    fetch("http://localhost:3030/todoget")
        .then((res) => res.json())
        .then((todos) => {
            console.log("todos", todos.message)
            const allTodos = todos.response
            for (var i = 0; i < allTodos.length; i++) {
                const todoId = allTodos[i]._id
                const todoTask = allTodos[i].newTask
                const todoEle = document.createElement("div")
                todoEle.innerHTML += `
            <span> ${todoTask} </span>
            <div>
                <button id = "${todoId}" onclick = "todoEdit(this)">
                    <img src="./images/editing.png" alt="">
                </button>
                <button id = "${todoId}" onclick = "todoDelete(this)">
                    <img src="./images/remove.png" alt="">
                </button>`
                todosContainer.appendChild(todoEle)
            }
        })
        .catch((err) => {
            console.log("error", err)
        })
}

const todoCreate = () => {
    console.log("todoGet")
    if (inputTodo.value.length < 3) {
        alert("Please Enter any todo")
        return
    }
    const data = {
        newTask: inputTodo.value
    }
    fetch("http://localhost:3030/todocreate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log("response", response)
            alert("Todo Created Successfully!")
            todosContainer.innerHTML = "" // todosContainer empty
            todoGet() //refresh the UI
        })
        .catch((error) => {
            console.log("error", error)
            alert("error", error.code)
        })

}




const todoEdit = (ele) => {
    console.log("todoGet")
    const eleId = ele.id
    const editPrompt = prompt("Enter value!")
    if (editPrompt == null) {
        alert("Please Enter any todo")
        return
    }
    const data = {
        newTask: editPrompt
    }
    fetch(`http://localhost:3030/todoupdate/${eleId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log("response", response)
            alert("Todo Updated Successfully!")
            todosContainer.innerHTML = "" // todosContainer empty
            todoGet() //refresh the UI
        })
        .catch((error) => {
            console.log("error", error)
            alert("error", error.code)
        })
}




const todoDelete = (ele) => {
    const eleId = ele.id
    const deletPrompt = confirm("Are you sure!")

    if (deletPrompt) {
        fetch(`http://localhost:3030/tododelete/${eleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("response", response)
                alert("Todo Deleted Successfully!")
                todosContainer.innerHTML = "" // todosContainer empty
                todoGet() //refresh the UI
            })
            .catch((error) => {
                console.log("error", error)
                alert("error", error.code)
            })
    }else{
        return
    }
}

