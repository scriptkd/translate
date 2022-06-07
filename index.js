const AWS = require("aws-sdk");
const Translate = new AWS.Translate({apiVersion: "2017-07-01"});

exports.handler = async (event) => {
    const { from, to, text } = event.queryStringParameters;
    const params = { SourceLanguageCode: from, TargetLanguageCode: to, Text: text };
    const result = await Translate.translateText(params).promise();
    const responseBody = result.TranslatedText;
    const response = {
        headers: {"access-control-allow-origin": "*", "content-type": "text/json" },
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };
    return response;
};
