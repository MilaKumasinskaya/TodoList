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

    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "Active":
                return tasksList.filter(t => !t.isDone)
            case "Completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
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

    const changeTaskStatus = (taskID: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDone} : t))
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={getFilteredTasksForRender(tasks, filter)}
                      filter={filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTodoListFilter={changeTodoListFilter}/>

        </div>
    );
}

export default App;
