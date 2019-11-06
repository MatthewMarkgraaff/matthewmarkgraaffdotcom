// @flow strict
import React, { useState } from 'react';
import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <React.Fragment>
      <form method="post" className={styles['contact']} netlify-honeypot="bot-field" data-netlify="true" name="contact">
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
