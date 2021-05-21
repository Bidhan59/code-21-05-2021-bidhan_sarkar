const { expect } = require("chai");
const sinon = require("sinon");
const sinonTestFactory = require("sinon-test");
const root = require("app-root-path");

const sinonTest = sinonTestFactory(sinon);
const appRoot = require("app-root-path");

const dataController = require(`${appRoot}/controllers/ProcessData`);

describe.only("Process Data api unit test suite", () => {
  it(
    "expect #processData API to process data based on the payload provided",
    sinonTest(async function () {
      let dataPayload = {
        data: [
          {
            Gender: "Male",
            HeightCm: 171,
            WeightKg: 96,
          },
          {
            Gender: "Male",
            HeightCm: 161,
            WeightKg: 85,
          },
          {
            Gender: "Male",
            HeightCm: 180,
            WeightKg: 77,
          },
          {
            Gender: "Female",
            HeightCm: 166,
            WeightKg: 62,
          },
          {
            Gender: "Female",
            HeightCm: 150,
            WeightKg: 70,
          },
          {
            Gender: "Female",
            HeightCm: 167,
            WeightKg: 82,
          },
        ],
      };
      const req = {
        body: {
          ...dataPayload,
        },
      };
      const fakeRes = {
        status: this.stub(),
      };
      fakeRes.status.returns({
        json(testData) {
          return testData; // faking it to return for test.
        },
      });
      let response = {
        status: "success",
        statusCode: 200,
        message: {
          OverwieghtCount: 1,
          result: [
            {
              Gender: "Male",
              HeightCm: 171,
              WeightKg: 96,
              "BMI Range": 32.83061454806607,
              "BMI Category": "Moderately obese",
              "Health risk": "Medium risk",
            },
            {
              Gender: "Male",
              HeightCm: 161,
              WeightKg: 85,
              "BMI Range": 32.79194475521778,
              "BMI Category": "Moderately obese",
              "Health risk": "Medium risk",
            },
            {
              Gender: "Male",
              HeightCm: 180,
              WeightKg: 77,
              "BMI Range": 23.76543209876543,
              "BMI Category": "Normal weight",
              "Health risk": "Low risk",
            },
            {
              Gender: "Female",
              HeightCm: 166,
              WeightKg: 62,
              "BMI Range": 22.49963710262738,
              "BMI Category": "Normal weight",
              "Health risk": "Low risk",
            },
            {
              Gender: "Female",
              HeightCm: 150,
              WeightKg: 70,
              "BMI Range": 31.11111111111111,
              "BMI Category": "Moderately obese",
              "Health risk": "Medium risk",
            },
            {
              Gender: "Female",
              HeightCm: 167,
              WeightKg: 82,
              "BMI Range": 29.402273297715947,
              "BMI Category": "Overweight",
              "Health risk": "Enhanced risk",
            },
          ],
        },
      };
      const dataService = await dataController.processData(req, fakeRes);
      expect(dataService).to.deep.include(response);
    })
  );
});
