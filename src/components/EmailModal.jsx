import React, { useState } from 'react';
import './EmailModal.css';

const EmailModal = ({ closeModal, onSendEmail, selectedRowData }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setEmailError('');
            return true;
        } else {
            setEmailError('Invalid email address');
            return false;
        }
    };

    const handleSendEmail = () => {
        if (validateEmail()) {
            // onSendEmail(email);
            const emailContent = { 'user_id': selectedRowData.user_id, 'password': selectedRowData.password, 'email': email }

            onSendEmail(emailContent);
            closeModal();
        }
    };

    return (
        <div className='email-modal-container' onClick={(e) => {
            if (e.target.className === 'email-modal-container') closeModal();
        }}>
            <div className='email-modal'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            name='email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className='error'>{emailError}</div>}
                    </div>
                    <button type='button' className='btn' onClick={() => handleSendEmail()}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailModal;