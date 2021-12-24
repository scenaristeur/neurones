#!/usr/bin/env node
const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();

(async function main() {
  const result = await myEngine.query(`
    ASK {
      ?s ?p <http://dbpedia.org/resource/Belgium>
    }`, {
      sources: [
        'http://fragments.dbpedia.org/2015/en',
        'https://spoggy-test5.solidcommunity.net/',
      ],
    })
    const hasMatches = await result.booleanResult;
    console.log(hasMatches)
  })();
