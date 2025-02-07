import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

function ContactPage() {
  return (
    <div className="contact-container">
      <div className="flex-container">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}

export default ContactPage;
