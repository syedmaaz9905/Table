import React, { useState } from 'react'
import './Modal.css'

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(defaultValue || {
        username: "",
        password: "",
        availability: "yes",
    });

    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.username && formState.password && formState.availability) {
            setErrors("")
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key)
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        onSubmit(formState)

        closeModal();
    };

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}
        >
            <div className='modal'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input name='username' value={formState.username} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input name='password' value={formState.password} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='availability'>Availability</label>
                        <select name='availability' value={formState.availability} onChange={handleChange} >
                            <option value="yes">
                                Yes
                            </option>
                            <option value="no">
                                No
                            </option>
                        </select>
                    </div>
                    {
                        errors && <div className='error'>{`Please include: ${errors}`}</div>
                    }
                    <button type='submit' className='btn' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Modal