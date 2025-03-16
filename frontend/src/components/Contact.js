import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to us.</p>
      <div className="contact-details">
        <p>Email: support@moviebooking.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Movie St, Film City, CA 12345</p>
      </div>
    </div>
  );
};

export default Contact;
