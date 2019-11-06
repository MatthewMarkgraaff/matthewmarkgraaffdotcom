// @flow strict
import React, { useState } from 'react';
import styles from './Contact.module.scss';
import Banner from '../Banner';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  })

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: contact,
    }).then(response => {
      setSubmitted(true)
      setContact({
        name: '',
        email: '',
        message: ''
      })
    })
    .catch(error => {
      console.log(`error in submiting the form data: ${error}`)
    })
  }

  return (
    <React.Fragment>
      {
        submitted && (
          <Banner bannerType="success">
            Success! Thank you for reaching out. I'll be in touch soon.
          </Banner>
        )
      }
      <form onSubmit={handleSubmit} method="post" className={styles['contact']} netlify-honeypot="bot-field" data-netlify="true" name="contact">
        <input type="hidden" name="bot-field" />
        <label>
          Name
          <input type="text" name="name" id="name" value={contact.name} onChange={(e)=>setContact({ ...contact, name: e.target.value })} />
        </label>
        <label>
          Email
          <input type="email" name="email" id="email" value={contact.email} onChange={(e)=>setContact({ ...contact, email: e.target.value })} />
        </label>
        <label>
          Message
          <textarea name="message" id="message" rows="5" value={contact.message} onChange={(e)=>setContact({...contact, message: e.target.value })} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
};

export default Contact;
