import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from 'react';
import {TaskType} from "./App";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskID: string, newIsDone: boolean, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const  [error, setError] = useState<boolean>(false)

    // const addTaskInputRef = useRef<any>(null)

    let isAllTasksDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone !== true) {
            isAllTasksDone = false
            break;
        }
    }

    const todoClasses = isAllTasksDone ? "todolist" : "todolist-empty"
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })

    const isAddTaskNotPossible: boolean = title.length === 0 || title.length > maxTitleLength || error
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        } setTitle('')

        // if(addTaskInputRef.current) {
        //     props.addTask(addTaskInputRef.current.value)
        //     addTaskInputRef.current.value = ''
        // }
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)}
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const longTitleWarning = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: "hotpink"}}>Title should be shorter!</div>
    const longTitleError = title.length > maxTitleLength && <div style={{color: "red"}}>Title is too long!</div>
    const errorMessage = error && <div style={{color: "red"}}>Title is hard required!</div>
    return (
        <div className={todoClasses}>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    placeholder='enter task title'
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? 'input-error' : ''}
                    /*   e.currentTarget === input  */
                    // ref={addTaskInputRef}
                />
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}>+
                </button>
                {longTitleWarning}
                {longTitleError}
                {errorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'All' ? 'btn-active': ''}
                    onClick={() => {
                    props.changeTodoListFilter('All', props.todoListId)
                }}>All
                </button>
                <button
                    className={props.filter === 'Active' ? 'btn-active': ''}
                    onClick={() => {
                    props.changeTodoListFilter('Active', props.todoListId)
                }}>Active
                </button>
                <button
                    className={props.filter === 'Completed' ? 'btn-active': ''}
                    onClick={() => {
                    props.changeTodoListFilter('Completed', props.todoListId)
                }}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;