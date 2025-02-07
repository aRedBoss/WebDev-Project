import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import "./Contact.css";

function ContactPage() {
  return (
    <div className="contact-container flex flex-col md:flex-row justify-center gap-8 p-6">
      <ContactForm />
      <ContactInfo />
    </div>
  );
}

export default ContactPage;
