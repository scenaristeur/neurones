#!/usr/bin/env node
const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();

(async function main() {
  const result = await myEngine.query(`
    SELECT ?s ?p ?o WHERE {
      ?s ?p <http://dbpedia.org/resource/France>.
      ?s ?p ?o
    } LIMIT 100`, {
      sources: ['https://fragments.dbpedia.org/2016-04/en'],
    })
    result.bindingsStream.on('data', (binding) => {
      console.log(binding.get('?s').value);
      console.log(binding.get('?s').termType);
      console.log(binding.get('?p').value);
      console.log(binding.get('?o').value);
    });

    result.bindingsStream.on('end', () => {
      // The data-listener will not be called anymore once we get here.
      console.log("--- this is the end, my friend")
    });

    result.bindingsStream.on('error', (error) => {
      console.error(error);
    });
  })();
