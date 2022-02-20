import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from "feature/todoSlice"
import { useEffect } from 'react';
const Alltodo = () => {
    const allTodo = useSelector(data => data.todos)

    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(fetchTodo())
    }, []);
    if (allTodo.status == "loading") {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='container'>
            {
                allTodo.todos.map((t, index) => {
                    return (
                        <div className='card mb-3' key={index}>
                            <div className="card-body">
                                <h5 class="card-title">Title: {t.title}</h5>
                                <h5 class="card-title">Name :{t.userName}</h5>
                                <p class="card-text">Description:{t.description}</p>
                                <p class="card-text">Date:{t.date}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Alltodo;
