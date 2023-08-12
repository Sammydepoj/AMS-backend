const { createMailTransorter } = require("./createMailTransaporter");

const sendVerificationMail = (user) => {
  const transport = createMailTransorter();
  const date = new Date()

  const mailOption = {
    from: '"SAIL Student Management Portal" <matthewoluwajuwon056@outlook.com> ',
    to: user.email,
    subject: "EMAIL VERIFICATION",
    html: `<html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Email verification</title>
        </head>
        <body style=" margin: 0;background-color: transparent;font-family: Gelion, sans-serif;">
          <div
            style="width: 100%;
          table-layout: fixed;
          background-color: transparent;
          padding-bottom: 60px;"
          >
            <table
              style="background-color: #ffffff;
          margin: 0 auto;
          width: 100%;
          max-width: 700px;
          border-spacing: 0;
          color: #171a1b;"
              width="100%"
            >
              <tr>
                <td
                  height="120"
                  style="
                  background-color: #171a1b;
                  display: flex;
                  align-items: center;
                "
                >
                    SSMP
                </td>
              </tr>
              <tr>
                <td style="background-color: #ffffff">
                  <main>
                    Dear <b>${user.firstName?.toUpperCase()}</b>! We have received your application to participate in the next cohort of ${user.programme?.toUpperCase()} organised by SAIL.
                    The application process is still on and we shall get back to you very soon after shortlisting the applications that we feel meet the minimum criteria.

                    Best regards,
                    Management
                    
                    
                  </main>
                </td>
              </tr>
              <tr>
                <td
                  height="70"
                  style="
                  text-align: center;
                  background-color: #171a1b;
                  color: #ffffff;
                "
                >
                  <h3>©${date.getFullYear()} SSMP</h3>
                </td>
              </tr>
            </table> 
          </div>
        </body>
      </html>`,
  };
  transport.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email verification sent");
    }
  });
};

exports.sendVerificationMail = sendVerificationMail;
