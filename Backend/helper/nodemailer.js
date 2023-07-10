const nodemailer = require("nodemailer");

async function main(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kobonagara@gmail.com",
      pass: "czwzkvtwwbftzgjo",
    },
  });

  let detail = {
    from: '"Confirmation Email" <kobonagara@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Account Registered", // Subject line
    text: "You have registered", // plain text body
    html: "<b>Thank you for registering to Zooro Store</b>", // html body
  };

  mailTransporter.sendMail(detail, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email has been sent");
    }
  });
}

module.exports = main;
