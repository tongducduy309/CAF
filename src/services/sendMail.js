import "https://smtpjs.com/v3/smtp.js";
export function sendMail() {
  Email.send({
      Host: "smtp.gmail.com",
      Username: "tongducduy@gmail.com",
      Password: "qxuo gfpd gbhr zatu",
      To: 'gipas309@email_address.com',
      From: "tongducduy@gmail.com",
      Subject: "Sending Email using javascript",
      Body: "Well that was easy!!",
  })
      .then(function (message) {
          alert("mail sent successfully")
      });
}
