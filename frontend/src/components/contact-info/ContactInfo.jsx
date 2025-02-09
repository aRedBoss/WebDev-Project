import "./ContactInfo.css";

function ContactInfo() {
  const hours = [
    { day: "Monday", time: "9:00 - 18:00" },
    { day: "Tuesday", time: "9:00 - 18:00" },
    { day: "Wednesday", time: "9:00 - 18:00" },
    { day: "Thursday", time: "9:00 - 18:00" },
    { day: "Friday", time: "9:00 - 18:00" },
    { day: "Saturday", time: "9:00 - 18:00" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <div className="contact-info">
      <div className="">
        {/* Contact Info */}
        <div className="">
          <h2 className="">Contact Info</h2>
          <p className="contact-info-label">Email:</p>
          <a href="mailto:ahmedmslawi@gmail.com" className="link">
            ahmedmslawi@gmail.com
          </a>

          <p className="contact-info-label location">Location:</p>
          <p>Helsinki, 18 FI</p>

          <p className="contact-info-label">Hours:</p>
          <table>
            <tbody>
              {hours.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td className="text-right">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
