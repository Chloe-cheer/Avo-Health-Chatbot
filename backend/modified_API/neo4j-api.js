const neo4j = require('neo4j-driver').v1;

const graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
const graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
const graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

console.log([graphenedbURL, graphenedbUser, graphenedbPass])

class Neo4jApi {

  constructor() {
    this.driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass), {
      encrypted: 'ENCRYPTION_OFF'
    });
  }

  getSymptoms(name) {
    const session = this.driver.session();
    const promise = new Promise((resolve, reject) => {
      session
        .run(`
           MATCH (sy:symptom)-[:rel]-(con:disease{name:$name})
            RETURN sy`, {name: name})
        .then((result) => {
          session.close();
          resolve(result.records
            .map(record => record._fields[0].properties.name));
        })
        .catch((error) => {
          session.close();
          reject(error);
        });
    });

    return promise;
  }

  getConditions(name) {
    const session = this.driver.session();
    const promise = new Promise((resolve, reject) => {
      session
        .run(`
            MATCH (con:disease)-[:rel]-(sy:symptom{name:$name})
            RETURN con`, {name: name})
        .then((result) => {
          session.close();
          console.log('result start');
          console.log(result.records.length);
          console.log('result end');
          if (result.records.length == 0) {
            reject('no records');
          } else {
            // console.log(result.records[0]);
            let x = result.records.map(record => record._fields[0].properties.name);
            console.log(x[0]);
            resolve(x);
          }
        })
        .catch((error) => {
          session.close();
          reject(error);
        });
    });

    return promise;
  }

  nodeSize(name) {
    const session = this.driver.session();
    const promise = new Promise((resolve, reject) => {
      session
        .run(`
            MATCH (con1:disease) WHERE con1.name = $name
            RETURN con1,size((con1)--()) as count`, {name: name})
        .then((result) => {
          session.close();
          // console.log(result.records.length)
          // if (result.records.length > 0) {
          //   console.log(result.records[0])
          // }
          resolve(result.records
            .map(record => record._fields[1].low));
        })
        .catch((error) => {
          session.close();
          // console.log('nodeSize(%s)error', name)
          reject(error);
        });
    });
    return promise;
  }

  close() {
    this.driver.close();
  }

}

module.exports = Neo4jApi;