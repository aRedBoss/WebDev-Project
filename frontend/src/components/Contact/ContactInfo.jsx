// import "./Contact.css";

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
    <div className="">
      <div className="">
        {/* Contact Info */}
        <div className="bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Contact Info
          </h2>
          <p className="text-lg font-bold text-gray-800">Email:</p>
          <a
            href="mailto:ahmedmslawi@gmail.com"
            className="text-blue-500 hover:underline block mb-4"
          >
            ahmedmslawi@gmail.com
          </a>

          <p className="text-lg font-bold text-gray-800">Location:</p>
          <p className="text-gray-600 mb-4">Helsinki, 18 FI</p>

          <p className="text-lg font-bold text-gray-800">Hours:</p>
          <table className="w-full mt-2">
            <tbody>
              {hours.map((item, index) => (
                <tr key={index} className="">
                  <td className="">{item.day}</td>
                  <td className="py-1 text-right font-medium">{item.time}</td>
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
