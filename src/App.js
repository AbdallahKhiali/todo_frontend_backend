import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Todos from './components/Todos'
import { AuthContext } from './contexts/Auth'
import { GeneralContext } from './contexts/general'

const App = () => {
  const { isAuth } = useContext(AuthContext)
  return (
    <Routes>

      {<Route path="/" exact element={isAuth ? <Todos /> : <Login />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  )
}

export default App