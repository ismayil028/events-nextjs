import classes from "./newsletter-registration.module.css";
import { useRef, useState } from "react";
function NewsletterRegistration() {
  const [isValid, setIsValid] = useState(false);
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const emailText = emailRef.current.value;
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: emailText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            // type="email"
            id="email"
            placeholder="Your email"
            // aria-label="Your email"
            className={`${!isValid ? classes.invalid : ""}`}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
