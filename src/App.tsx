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
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {
//BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'All'},
        {id: todoListId_2, title: "What to buy", filter: 'All'},

    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]:
            [{id: v1(), title: "HTML & CSS ", isDone: false},
            {id: v1(), title: "CSS & SCSS ", isDone: true},
            {id: v1(), title: "ES6/TS ", isDone: true},
            {id: v1(), title: "REDUX ", isDone: true}],

        [todoListId_2]:
            [{id: v1(), title: "Sugar ", isDone: false},
            {id: v1(), title: "Bread ", isDone: true},
            {id: v1(), title: "Milk ", isDone: true},
            {id: v1(), title: "Beer ", isDone: true}]
    })


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTask = (taskID: string, todoListId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task: TaskType) => task.id !== taskID)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = resultOfUpdate
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task: TaskType) => task.id !== taskID)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const resultOfUpdate: Array<TaskType> = [newTask, ...tasksForUpdate]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = resultOfUpdate
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskID: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: newIsDone} : t)})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
//UI
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

    const todoListComponents = todoLists.map(tl => {

        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
