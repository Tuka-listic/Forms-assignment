import React, { useState } from 'react';
import axios from 'axios';

const INITIAL_STATE = {name: '', email: '', subject:'', message:''};
const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid format";
    }
    if (!values.subject) {
      errors.subject = "Subject is required";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    return errors;
  };
  
const Info = () => {
    const [form, setForm] = useState(INITIAL_STATE)
    const [errorMessage, setErrorMessage] = useState ({})
    const [pending, setPending] = useState (false)
    const [status, setStatus] = useState ('')
    const handleChange = (event) => {
        const updateForm = {...form, [event.target.id]: event.target.value}
        setForm(updateForm);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage (() => validate (form));
        setPending (true)
        setStatus ('Pending')
       
        axios.post(`https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries`,{form})
       .then((response) => {
        console.log(response);
        setStatus('Submitted')
       }) 
       .catch((error) =>console.log(error))
       setForm (INITIAL_STATE)
    
    }



  return (
    <div className='container'> 
      <h2>Contact Form</h2>
        {pending && Object.keys (errorMessage).length === 0 ? (<span>Your message was sent successfully</span>): pending && Object.keys (errorMessage).length > 0 ? (<span>There was error submitting your message</span>): null}
        <form id='form-container' onSubmit={handleSubmit}>
            <div >
                <label htmlFor='name'>Name :</label>
                <input id='name' type='text' value={form.name} onChange={handleChange}/>
            </div>
            <span className='message' >{errorMessage.name}</span>
            <div>
                <label htmlFor='email'>Email :</label>
                <input id='email' type='text' value={form.email} onChange={handleChange}/>
            </div>
            <span>{errorMessage.email}</span>
            <div>
                <label htmlFor='subject'>Subject :</label>
                <textarea id='subject' placeholder='Topic' value={form.subject} onChange={handleChange}/>
            </div>
            <span>{errorMessage.subject}</span>
            <div>
                <label htmlFor='message'>Message :</label>
                <textarea id='message' placeholder="Write something.." style={{height:'200px'}} value={form.message} onChange={handleChange}/>
            </div>
            <span>{errorMessage.message}</span>
            <button type='submit'>{status === 'Pending'?'Pending....': status === 'Submitted'? 'Submitted': 'Submit'}</button>

        </form>
        </div>
  );
}

export default Info