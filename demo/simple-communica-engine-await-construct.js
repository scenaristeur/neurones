#!/usr/bin/env node
const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();

(async function main() {
  const result = await myEngine.query(`
    CONSTRUCT WHERE {
      ?s ?p ?o
    } LIMIT 100`, {
      sources: ['http://fragments.dbpedia.org/2015/en'],
    });
    result.quadStream.on('data', (quad) => {
      console.log(quad.subject.value);
      console.log(quad.predicate.value);
      console.log(quad.object.value);
      console.log(quad.graph.value);
    });

    result.quadStream.on('end', () => {
      console.log('end')
      // The data-listener will not be called anymore once we get here.
    });
    result.quadStream.on('error', (error) => {
      console.error(error);
    });


    const quads = await result.quads();

    console.log("-first",quads[0].subject.value);
    console.log("-first",quads[0].predicate.value);
    console.log("-first",quads[0].object.value);
    console.log("-first",quads[0].graph.value);


  })();
