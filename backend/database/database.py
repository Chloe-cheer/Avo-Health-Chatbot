import mysql.connector
from flask import Flask, request
from flask_cors import CORS, cross_origin

# setup local server
app = Flask(__name__)
CORS(app) # enable cors

@app.route("/", methods = ['POST'])
def post_handler():
    json = request.json
    print(json)
    
    if "messages" in json:
        if "age" in json["messages"]:
            # form 1
            insert(json)
        else:
            # form 2
            update(json)
    else:
        # chatbot
        update_record(json)

    return "roger that"

# database config
config = {
    'user': 'root',
    # 'password': '7jJI9dEFoJskp1hy',
    'host': 'localhost',
    # ssl validation
    # 'ssl_ca': 'ssl/server-ca.pem',
    # 'ssl_cert': 'ssl/client-cert.pem',
    # 'ssl_key': 'ssl/client-key.pem'
}
config['database'] = 'avocado'

# initialize database
def init():
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    # initialize database
    cursor.execute("DROP TABLE IF EXISTS avocado")
    # create table
    cursor.execute("""
                    CREATE TABLE avocado (
                    id INT PRIMARY KEY,
                    gender VARCHAR(30),
                    age INT,
                    height INT,
                    weight INT,
                    smoke VARCHAR(30),
                    high_cholesterol VARCHAR(30),
                    hypertension VARCHAR(30),
                    diabetes VARCHAR(30),
                    agreement VARCHAR(30),
                    messages VARCHAR(255),
                    result VARCHAR(255)
                    );""")
    cnxn.commit()
    cnxn.close()
    print("initialize complete!")


# insert a new entry(form1)
def insert(data):
    
    messages = data['messages']
    id = int(data['USERID'])
    gender = messages["gender"]
    age = int(messages["age"])
    height = int(messages["height"])
    weight = int(messages["weight"])
    print(id, messages)

    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    # insert entries
    query = """INSERT INTO avocado(id,gender,age,height,weight,smoke,high_cholesterol,hypertension,diabetes,agreement,messages,result)
                VALUES ({}, '{}', {}, {}, {}, 'NA', 'NA', 'NA', 'NA', 'NA','NA','NA');""".format(id,gender,age,height,weight)
    print(query)
    cursor.execute(query)
    cnxn.commit()
    cnxn.close()
    print("insert complete!")

# update an existing entry(form2)
def update(data):
    messages = data['messages']
    id = data['USERID']
    doSmoke = messages["doSmoke"]
    doHighCholesterol = messages["doHighCholesterol"]
    doHypertension = messages["doHypertension"]
    doDiabetes = messages["doDiabetes"]
    agreement = messages["acceptedDataCollection"]
    print(id, messages)

    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    # insert entries
    query = """UPDATE avocado SET smoke = '{}', high_cholesterol = '{}',
                      hypertension = '{}', diabetes = '{}', agreement = '{}' WHERE id = {};""".format(doSmoke,doHighCholesterol,doHypertension,doDiabetes,agreement,id)
    print(query)
    cursor.execute(query)
    cnxn.commit()
    cnxn.close()
    print("update complete!")

# update an existing entry(chatbot message)
def update_record(data):
    id = data['USERID']
    answers = str(data['validAnswers']).replace("'","")
    result = str(data['data']['probability']).replace("'","")

    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    # insert entries
    query = """UPDATE avocado SET messages = '{}', result = '{}'
                      WHERE id = {};""".format(answers,result,id)
    print(query)
    cursor.execute(query)
    cnxn.commit()
    cnxn.close()
    print("update record complete!")


# run the server
if __name__ == "__main__":
    init()
    app.run(host='0.0.0.0', port=3002, debug=True)
