const _ = require("lodash");

async function processData(req, res) {
  if (_.isNil(req.body) || _.isNil(req.body.data)) {
    return res.status(400).json({
      status: "Failure",
      statusCode: 400,
      message: "NO PAYLOAD PROVIDED",
    });
  }
  const data = req.body.data;
  let finalData = [];
  let OverwieghtCount = 0;
  data.forEach((d) => {
    d["BMI Range"] = d["WeightKg"] / ((d["HeightCm"] * d["HeightCm"]) / 10000);
    if (d["BMI Range"] < 18.4) {
      d["BMI Category"] = "Underweight";
      d["Health risk"] = "Malnutrition risk";
    } else if (d["BMI Range"] > 18.5 && d["BMI Range"] < 24.9) {
      d["BMI Category"] = "Normal weight";
      d["Health risk"] = "Low risk";
    } else if (d["BMI Range"] > 25 && d["BMI Range"] < 29.9) {
      d["BMI Category"] = "Overweight";
      d["Health risk"] = "Enhanced risk";
      OverwieghtCount = OverwieghtCount + 1;
    } else if (d["BMI Range"] > 30 && d["BMI Range"] < 34.9) {
      d["BMI Category"] = "Moderately obese";
      d["Health risk"] = "Medium risk";
    } else if (d["BMI Range"] > 35 && d["BMI Range"] < 39.9) {
      d["BMI Category"] = "Severely obese";
      d["Health risk"] = "High risk";
    } else if (d["BMI Range"] > 40) {
      d["BMI Category"] = "Very severely obese";
      d["Health risk"] = "Very high risk";
    }
    finalData.push(d);
  });
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    message: {
      OverwieghtCount: OverwieghtCount,
      result: finalData,
    },
  });
}

module.exports = {
  processData: processData,
};
