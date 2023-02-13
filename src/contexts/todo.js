import axios from "axios";
import { useState, createContext, useContext } from "react";
import { AuthContext } from "./Auth";
import { GeneralContext } from "./general";



export const TodoContext = createContext({})



export const TodoContextProvider = ({ children }) => {


    const { API_URI, axiosConfig } = useContext(GeneralContext)
    const { userId } = useContext(AuthContext)

    const [todos, setTodos] = useState([]);
    const [istodoModal, setTodoModal] = useState(false);
    const [todoDetails, setTodoDetails] = useState()
    const [todoForm, setTodoForm] = useState({
        title: '',
        description: '',
        dueTo: '',
    })



    const handleChange = (e, name) => {
        setTodoForm({ ...todoForm, [name]: e.target.value })
    }




    const createTodo = (userId) => {
        axios.post(`${API_URI}/todos/${userId}`, todoForm, axiosConfig).then((response) => {
            // setTodos(response)
            setTodoModal(false)
        }).catch(err => console.log(err));
    }

    const deleteTodo = (todoId, userId) => {
        axios.delete(`${API_URI}/todos/users/${userId}/${todoId}`, axiosConfig).then((res) => {
            window.location.reload()
        }).catch((err) => { console.log(err) })
    }

    const getUsersTodos = (userId) => {
        axios.get(`${API_URI}/todos/users/${userId}`, axiosConfig).then((res) => {
            setTodos(res.data)
        }).catch((err) => { console.log(err) })
    }

    const getTodoById = (id) => {
        axios.get(`${API_URI}/todos/${id}`,).then((res) => {
            setTodoDetails(res.data)
        }).catch((err) => { console.log(err) })
    }

    //Here you declare states and functions 




    const value = {

        //  getTodos,
        // updateTodo,

        deleteTodo,
        getTodoById,
        createTodo,
        todos, setTodos, getUsersTodos,
        todoDetails, setTodoDetails,
        todoForm, setTodoForm, istodoModal, setTodoModal, handleChange
        // all states and functions 

    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )


}
