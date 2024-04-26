import React, { useState } from 'react'
import './Modal.css'

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(defaultValue || {
        id: "",
        user_id: "",
        password: "",
        is_available: "1",
    });

    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.user_id && formState.password && formState.is_available) {
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
                        <label htmlFor='user_id'>Username</label>
                        <input name='user_id' value={formState.user_id} onChange={handleChange} readOnly />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input name='password' value={formState.password} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='ip_address'>IP Address</label>
                        <input name='ip_address' value={formState.password} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='is_available'>Availability</label>
                        <select name='is_available' value={formState.is_available} onChange={handleChange} >
                            <option value="1">
                                Yes
                            </option>
                            <option value="0">
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