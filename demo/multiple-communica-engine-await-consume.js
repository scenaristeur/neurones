#!/usr/bin/env node
const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();
var cpt = 0;

(async function main() {

  const result = await myEngine.query(`
    SELECT ?s ?p ?o WHERE {
      ?s ?p ?o
    } LIMIT 100`, {
      sources: [
        //  'https://fragments.dbpedia.org/2016-04/en',
         'https://www.rubensworks.net',
         'https://ruben.verborgh.org/profile/',
        'https://spoggy-test5.solidcommunity.net/',
        'https://spoggy-test4.solidcommunity.net/profile/card#me'
      ],
    })
    result.bindingsStream.on('data', (binding) => {
      // console.log(binding.get('?s').value);
      // console.log(binding.get('?s').termType);
      // console.log(binding.get('?p').value);
      // console.log(binding.get('?o').value);

      runSomething(binding)
    });

    result.bindingsStream.on('end', () => {
      // The data-listener will not be called anymore once we get here.
      console.log("--- this is the end, my friend")
    });

    result.bindingsStream.on('error', (error) => {
      console.error(error);
    });

    const bindings = await result.bindings();

    console.log("\n The first has value ",bindings[0].get('?s').value);
    console.log("\n The first is a ",bindings[0].get('?s').termType);

  })();

  function runSomething(b){
    console.log("\n ",cpt," running something on ", b.get('?s').value)
    console.log(JSON.stringify(b.entries()))
    console.log(JSON.stringify(b))
    cpt ++
  }
