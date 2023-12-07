import React, {useState, useEffect} from 'react';

import { Card } from '../Components/Card/card'; 
import { Form } from '../Components/Form/form'; 

export const TodoPage = () => {

    const [todo, setTodo] = useState([]) 
    const [addTodo, setAddTodo] = useState('')

    useEffect(() => {
        // debugger
        fetch('/api').then(response => {
            // debugger
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTodo(data))
    },[])

    const handleFormChange = (inputValue) => {
        setAddTodo(inputValue)
        console.log(addTodo)
    }
    
    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({content: addTodo}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8' 
            }
            }).then(response => response.json())
            .then(message => {
                console.log(message)
                setAddTodo('')
                getLatestTodo()
            }) 
    }

    const getLatestTodo = () => {
        fetch('/api').then(response => {
            // debugger
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTodo(data))
    }
    
    return (
        <>
            <Form userInput={addTodo} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <Card listOfTodos={todo}/>
        </>
    )
}