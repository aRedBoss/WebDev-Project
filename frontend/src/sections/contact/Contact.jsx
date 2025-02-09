import ContactForm from "../../components/contact-form/ContactForm";
import ContactInfo from "../../components/contact-info/ContactInfo";
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
