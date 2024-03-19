# mock API

## not found

in:
    {"answers": {"difficulty breathing":1}}
out:
    404

## sym1: fever, init

in:
    {"answers": {"fever":1}}
out:
    {
    "question": [
    "headache","coughing"
    ],
    "probability": {
    "Bacterial infections": 50,
    "Animal bites": 30,
    "Poisoning": 20,
    },
    "endDiagnose": 0
    }


## sym2,3: headache, coughing

in:
    {"answers": {"fever":1, "headache":0,"coughing":1}}
out:
    {
    "question": [
    "nausea",
    ],
    "probability": {
    "Bacterial infections": 60,
    "Animal bites": 30,
    "Poisoning": 20,
    },
    "endDiagnose": 0
    }

## sym4: vomiting

in:
    {"answers": {"fever":1, "headache":0, "coughing":1, "nausea":1}}
out:
    {
    "question": [
    "vomiting"
    ],
    "probability": {
    "Bacterial infections": 70,
    "Animal bites": 40,
    "Poisoning": 20,
    },
    "endDiagnose": 0
    }

## sym5: feeling tired or fatigued

in:
    {"answers": {"fever":1, "headache":0, 
    "coughing":1, "nausea":1, "vomiting":1}}
out:
    {
    "question": [
    "feeling tired or fatigued"
    ],
    "probability": {
    "Bacterial infections": 70,
    "Animal bites": 40,
    "Poisoning": 20,
    },
    "endDiagnose": 0
    }

## Result

in:
    {"answers": {"flag":1, "answers": {"fever":1, "headache":0,
    "coughing":1, "nausea":1, "vomiting":1, 
    "feeling tired or fatigued":1}}
out:
    {
    "probability": {
    "Bacterial infections": 95,
    "Animal bites": 50,
    "Poisoning": 40,
    },
    "endDiagnose": 1
    }
