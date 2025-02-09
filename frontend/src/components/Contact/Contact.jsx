import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import "./Contact.css";

function ContactPage() {
  return (
    <div className="contact-container">
      <ContactForm />
      <ContactInfo />
    </div>
  );
}

export default ContactPage;
