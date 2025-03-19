import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "../styles/Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.send(
      "service_ikm4hse",
      "template_iolfpvj",
      {
        to_name: "Admin",
        from_name: formData.name,
        message: `You received a new message from:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`,
        user_email: formData.email,
        user_phone: formData.phone,
      },
      "TuAmYC74OrC7lb6-t"
    ).then(
      (result) => {
        console.log("Email sent successfully:", result);
        setStatus("success");
        setFormData({ name: "", email: "", phone: "" });
      },
      (error) => {
        console.error("Error sending email:", error);
        setStatus("error");
      }
    );
  };

  return (
    <div className={styles.register}>
      <div className={styles.register_item}>
        <div className={styles.register_input}>
          <div className={styles.back_home}>
            <button onClick={() => window.location.reload()}>Back Home</button>
          </div>
          <span>Fill in the form to get notified of events</span>
          <form onSubmit={sendEmail} className="space-y-6 mt-6">
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
                placeholder="+917895244178"
              />
            </div>
            <button
              type="submit"
              className="w-full bottom-3 mb-8 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Get notified
            </button>
          </form>
          {status && (
            <div className="mt-4 text-center">
              <p
                className={`text-sm font-semibold p-2 rounded-lg ${
                  status === "sending"
                    ? "text-blue-600 bg-blue-100"
                    : status === "success"
                    ? "text-green-600 bg-green-100"
                    : status === "error"
                    ? "text-red-600 bg-red-100"
                    : ""
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully!"
                  : "Failed to send message. Please try again."}
              </p>
            </div>
          )}
        </div>
        <div className={styles.image}>
          <div className={styles.image_title}>
            <span>Party like there is no tomorrow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
