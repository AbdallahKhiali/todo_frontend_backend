import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { GeneralContext } from '../../contexts/general'
import { TodoContext } from '../../contexts/todo'
import Modal from '../../utils/modal'
import "./todos.scss"





const Todos = () => {


    const { deleteTodo, createTodo, todos, setTodos, getTodoById, getUsersTodos, istodoModal, setTodoModal, todoDetails, handleChange } = useContext(TodoContext)
    const { isModal, setModal } = useContext(GeneralContext)
    const { userId } = useContext(AuthContext)

    useEffect(() => {
        getUsersTodos(userId)
    }, [todos])



    return (
        <div className='todo'>

            {/* add-todo-modal */}
            {
                isModal && <Modal >

                    <div className='form-todo' >
                        <div className="formulaire col-2 ">
                            <div className="formulaire_container ">
                                <label>title <span style={{ color: 'red' }} >*</span></label>
                                <input type="text" className="formulaire_input" onChange={(e) => { handleChange(e, "title") }} placeholder="title" />
                            </div>

                            <div className="formulaire_container ">
                                <label>due to</label>
                                <input type="text" className="formulaire_input" onChange={(e) => { handleChange(e, "dueTo") }} placeholder="date " />
                            </div>

                            <div className="formulaire_container ">
                                <label>description</label>
                                <textarea type="text" className="formulaire_input" onChange={(e) => { handleChange(e, "description") }} placeholder=" " />
                            </div>
                        </div>
                        <div className="modal-buttons">

                            <div className='button' onClick={() => { setModal(false) }} >
                                cancle
                            </div>
                            <div className='button primary-btn ' onClick={() => createTodo(userId)} >
                                ADD
                            </div>
                        </div>
                    </div>
                </Modal>
            }

            {/* add-todo-modal */}

            {/* --------------------------- */}

            {/* info-modal */}
            {
                istodoModal && <Modal>
                    <div className='form-todo' >
                        <div className="formulaire col-2 ">
                            <div className="formulaire_container info-content ">
                                <p>title</p>
                                <p>{todoDetails?.title}</p>
                            </div>
                            <div className="formulaire_container info-content ">
                                <p>dueTo</p>
                                <p>{todoDetails?.dueTo}</p>
                            </div>

                            <div className="formulaire_container info-content ">
                                <p>description</p>
                                <p>{todoDetails?.description}</p>
                            </div>
                        </div>

                        <div className='button primary-btn ' onClick={() => { setTodoModal(false) }} >
                            close
                        </div>
                    </div>
                </Modal>
            }
            {/* info-modal */}
            <div onClick={() => { localStorage.clear(); window.location.reload() }} className='button primary-btn logout ' >
                Logout
            </div>

            <h1>My Todos</h1>
            <div className='button primary-btn add-todo ' onClick={() => { setModal(true) }} >
                <img src={require('../../assets/add.svg').default} alt="add" />
            </div>
            <ul className='todo_list' >
                {
                    // console.log(todos)
                }
                {todos && todos.map((todo, index) => (
                    <li key={index} >
                        <span> {todo?.title}</span>
                        <div className='todos_buttons' >
                            <img src={require('../../assets/info.svg').default} alt="icon_todo" className='todo_icon info ' onClick={() => { getTodoById(todo._id); setTodoModal(true) }} />
                            <img src={require('../../assets/delete.svg').default} alt="icon_todo" className='todo_icon delete ' onClick={() => { deleteTodo(todo._id, userId) }} />
                        </div>

                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Todos