import React from 'react'
import "./modal.scss"
const Modal = ({ children }) => {
    return (
        <div className='modal-overlay' >
            <div className='modal'>
                {children}
            </div>
        </div>
    )
}

export default Modal