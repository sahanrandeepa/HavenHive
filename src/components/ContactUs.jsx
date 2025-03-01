import React from "react";

function ContactUs() {
  return (
    <main>
      <section>
        <h1>Contact Us</h1>
        <form action="https://formspree.io/f/xbljgerg" method="post">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}

export default ContactUs;
