import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterValuesType} from "./TodoList";
import {v1} from "uuid";

//create
//read
//update
//delete
//CRUD operations
//interface => GUI (CLI, VUI ...)
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App(): JSX.Element {

    console.log(v1())

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: false},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: true},
        {id: v1(), title: "REDUX", isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('All')

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: TaskType[] = tasks
    if (filter === 'Active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }


    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([...tasks, newTask])
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForRender}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}/>

        </div>
    );
}

export default App;
