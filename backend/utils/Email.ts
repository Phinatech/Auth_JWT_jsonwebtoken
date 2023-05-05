import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

//Not changing
const GOOGLE_ID =
  "897892694340-uds3srslea20jequ7m33tn25egp37bjj.apps.googleusercontent.com";
//Not changing
const GOOGLE_SECRET = "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";

//Not changing
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const GOOGLE_REFRESH =
  "1//040hViIk87d7BCgYIARAAGAQSNwF-L9Irndv3mRaWeIYqkkuBDfD461UjwwkhkRjYqdNG4CyClI4LfYpSVCVNbWoRvuh3CnGb3-M";
//This is the gotten from google api , use the rediredt link to work on that and its changes
const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REFRESH);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH });

const ClientURL = "";

//verifing the user on the platform:
export const verifyUser = async (user: any) => {
  try {
    const GetAccessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "seraphina2070@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH,
        accessToken: GetAccessToken,
      },
    });

    //connecting the account verification to ejs file and the user will get an email
    const loadVerification = path.join(__dirname, "../../views/index.ejs");

    //using the ejs method to read the account verification which is the ejs file
    const ReadVerifyData = await ejs.renderFile(loadVerification, {
      Username: user?.name,
      Useremail: user?.email,
      Userid: user?._id,
      Usertoken: user?.token,
      url: `${ClientURL}/${user?._id}/${user?.token}`,
    });

    const mailing = {
      from: "Tech pearl <seraphina2070@gmail.com>",
      to: user?.email,
      subject: "Verifying Your account ",
      html: ReadVerifyData,
    };

    transporter
      .sendMail(mailing)
      .then(() => {
        console.log("Verification email sent");
      })
      .catch((err) => {
        console.log("Verification email not sent ");
      });
  } catch (error) {
    console.log("An error occurred while verifying the user", error);
  }
};
