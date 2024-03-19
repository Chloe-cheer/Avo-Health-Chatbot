// This is the mock API without connecting to real database
// Please run the following code:
// npm install express
// npm install body-parser
const express = require('express'); // npm install express

const app = express();
const port = 3001;
const bodyParser = require('body-parser'); //npm install body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// eslint-disable-next-line camelcase
const symptom_list = ['fever', 'nausea', 'headache', 'coughing', 'vomiting', 'feeling tired or fatigued'];  // mock symptom list
let endDiagnose = 0;
// eslint-disable-next-line camelcase
let symptom_unanswered;
// eslint-disable-next-line camelcase
let condition_probability;
let finalReturn;

app.post('/Diagnosis', async(req, res) => {
  //eslint-disable-next-line camelcase
  if (req.body.flag === 1) {
    const answers = req.body.answers; // dict
    if (Object.keys(answers).filter(x => !symptom_list.includes(x)).length > 0) {
      res.status(404).send('Such symptom has not been recorded!');;

    } else {
      // eslint-disable-next-line camelcase
      symptom_unanswered = symptom_list.filter(x => !Object.keys(answers).includes(x));
      if (symptom_unanswered.includes('headache')) {
        // eslint-disable-next-line camelcase
        condition_probability = { 'Bacterial infections': 60, 'Animal bites':30, 'Poisoning': 20 };
        finalReturn = { question: ['headache', 'coughing'], probability: condition_probability, endDiagnose };

      } else if (symptom_unanswered.length > 0) {
        // eslint-disable-next-line camelcase
        symptom_unanswered = symptom_list.filter(x => !Object.keys(answers).includes(x));
        // eslint-disable-next-line camelcase
        condition_probability = { 'Bacterial infections': 70, 'Animal bites':40, 'Poisoning': 30 };
        // eslint-disable-next-line max-len
        finalReturn = { question: [symptom_unanswered[0]], probability: condition_probability, endDiagnose };

      } else { // finish asking all symptoms in the mock list
        endDiagnose = 1;
        // eslint-disable-next-line camelcase
        condition_probability = {'Bacterial infections': 95, 'Animal bites':60, 'Poisoning': 30 };;
        finalReturn = { probability: condition_probability, endDiagnose };
      }
      res.json(finalReturn);
      console.log(finalReturn);
    }

  } else {  // where req.body.flag === 0
    res.status(404).send('Such symptom has not been recorded!');
  }
})

app.listen(port,
    () => console.log('Server listening on http://localhost:3001'));
