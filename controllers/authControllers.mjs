import nodemailer from "nodemailer";

// Controller function to handle the 'Contact Us' form
export const sendContactUsMessage = async (req, res) => {
  const { email, message, name, subject } = req.body;

  try {
    if (!email || !message || !name) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const response = await sendContactEmail(email, message, name, subject || "New Contact Us Message");

    if (response.success) {
      return res.status(200).json({
        success: true,
        message: "Your message was sent successfully.",
      });
    } else {
      throw new Error(response.message);
    }

  } catch (error) {
    console.error("Error in sendContactUsMessage:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

// Function to send email using Nodemailer
const sendContactEmail = async (userEmail, message, name, subject) => {
  try {
    const emailUser = process.env.Emailuser;
    const emailPassword = process.env.Emailpassword;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: `"${name}" <${userEmail}>`, // Sender details
      to: emailUser,                    // Receiver (your business email)
      subject: subject,
      text: `You have received a new contact message:\n\nFrom: ${name} <${userEmail}>\n\nMessage:\n${message}`,
      replyTo: userEmail,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact message sent: " + info.response);

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error.message);
    return { success: false, message: "Error sending email." };
  }
};
