// @flow strict
import React, { useState } from 'react';
import styles from './Contact.module.scss';
import Banner from '../Banner';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    setSubmitted(true)
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
          <input type="text" name="name" id="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label>
          Message
          <textarea name="message" id="message" rows="5" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  )
};

export default Contact;
