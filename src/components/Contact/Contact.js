// @flow strict
import React from 'react';
import styles from './Contact.module.scss';

const Contact = () => (
  <form method="post" action="#" className={styles['contact']} netlify-honeypot="bot-field" data-netlify="true">
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
);

export default Contact;
