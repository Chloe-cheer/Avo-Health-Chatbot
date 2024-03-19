// This is the mock API without connecting to real database
// Please run the following code:
// npm install express
// npm install body-parser
// To start the api, run node mock_api.js
const express = require("express"); // npm install express
const cors = require("cors"); // npm install cors

const app = express();
app.use(cors());
const port = 3001;
const bodyParser = require("body-parser"); //npm install body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const symptomList = ["fever", "headache", "coughing", "nausea", "vomiting", "feeling_tired_or_fatigued"]; // mock symptom list

app.post("/Diagnosis", async (req, res) => {
    let endDiagnose = 0;
    let symptomUnanswered;
    let conditionProbability;
    let finalReturn;
    const answers = req.body.validAnswers; // dict
    if (Object.keys(answers).some((x) => !symptomList.includes(x))) {
        res.status(404).send("Such symptom has not been recorded!");
        return;
    }

    symptomUnanswered = symptomList.filter((x) => !Object.keys(answers).includes(x));
    if (symptomUnanswered.length > 0) {
        conditionProbability = {
            "Bacterial infections": 70,
            "Animal bites": 40,
            "Poisoning": 30,
        };
        finalReturn = {
            question: [symptomUnanswered[0]],
            probability: conditionProbability,
            endDiagnose,
        };
    } else {
        // finish asking all symptoms in the mock list
        endDiagnose = 1;

        conditionProbability = {
            "Bacterial infections": 95,
            "Animal bites": 60,
            "Poisoning": 30,
        };
        finalReturn = { probability: conditionProbability, endDiagnose };
    }
    res.json(finalReturn);
    console.log(finalReturn);

});

app.listen(port, () => console.log("Server listening on http://localhost:3001"));
