import ContactForm from "../../components/contact-form/ContactForm";
import ContactInfo from "../../components/contact-info/ContactInfo";
import "./Contact.css";

function ContactPage() {
  return (
    <section className="contact-container">
      <ContactForm />
      <ContactInfo />
    </section>
  );
}

export default ContactPage;
