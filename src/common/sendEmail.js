const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = (email, id) => {
    const link = process.env.LINKEVIDENCE;
    const from = process.env.FROMSEND_EMAIL;
    sgMail.send({
        to: email,
        from: from,
        subject: 'NANP Pro Xác thực tài khoản',
        text: ` `,
        html: `<a href='${link+id}'>Click here !</b></p>`

    }).then(() => {}, error => {
        console.error(error);
        
        if (error.response) {
            console.error(error.response.body)
        }
    });

}


// module.exports.sendTemplate = (to,from, templateId, dynamic_template_data) => {
//   const msg = {
//     to,
//     from: { name: 'Fix That Device', email: from },
//     templateId,
//     dynamic_template_data
//   };
//   console.log(msg)
//   sgMail.send(msg)
//     .then((response) => {
//       console.log('mail-sent-successfully', {templateId, dynamic_template_data });
//       console.log('response', response);
//       /* assume success */

//     })
//     .catch((error) => {
//       /* log friendly error */
//       console.error('send-grid-error: ', error.toString());
//     });
// };