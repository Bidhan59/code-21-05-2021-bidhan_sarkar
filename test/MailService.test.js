const { expect } = require("chai");
const sinon = require("sinon");
const sinonTestFactory = require("sinon-test");
const root = require("app-root-path");
const serviceSendMail = require(`${root}/config/serviceEmailServices`);

const sinonTest = sinonTestFactory(sinon);
const appRoot = require("app-root-path");

const mailServiceController = require(`${appRoot}/controllers/MailService`);
const configModel = require(`${root}/models/notificationConfig`);

describe.only("AdHoc Email Sending api unit test suite", () => {
  it(
    "expect #SendMail API to send email based on the payload provided",
    sinonTest(async function () {
      let emailPayload = {
        EmailTo: "sarkarbidhan59@gmail.com",
        Subject: "Test Notification",
        Text: "Testing Payload",
      };
      this.timeout(10000);
      const req = {
        db: {
          TestDB: "",
        },
        body: {
          ...emailPayload,
        },
      };
      const responseData = {
        status: "success",
        statusCode: 200,
        message: `EMAIL SENT`,
      };
      const fakeRes = {
        status: this.stub(),
      };
      const configObj = [
        {
          _id: Object("609bfef7490438ef8b2df390"),
          notification_type: "EMAIL",
          from: "noreplyshoppingportal",
          options: {
            host: "smtp.gmail.com",
            port: "xxx",
            secure: "true",
            auth: {
              user: "noreplyshoppingportal",
              pass: "xxxxxxxxxxxxxxxxxxxx",
            },
          },
        },
      ];
      fakeRes.status.returns({
        json(emailSent) {
          return emailSent; // faking it to return for test.
        },
      });
      const fetchConfigDataStub = this.stub(configModel, "fetchConfig").returns(
        Promise.resolve(configObj)
      );
      const sendEmailStub = this.stub(serviceSendMail, "sendMail").returns(
        Promise.resolve(true)
      );
      const mailService = await mailServiceController.sendEmail(req, fakeRes);

      expect(fetchConfigDataStub.calledOnce).to.be.true;
      expect(sendEmailStub.calledOnce).to.be.true;
      expect(mailService).to.have.all.keys("status", "message", "statusCode");
    })
  );
});
