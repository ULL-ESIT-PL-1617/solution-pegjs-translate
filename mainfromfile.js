#!/usr/bin/env node
var util = require('util');
var fs = require('fs');
var PEG = require("./grammar.js");
var genCode = require("./gen-code.js");

var fileName = process.argv[2] || 'input1';

fs.readFile(fileName, 'utf8', function (err,input) {
  if (err) { return console.log(err); }

  console.log(`Processing <\n${input}\n>`);

  /* Parsing: building AST */
  var r = PEG.parse(input);
  console.log(util.inspect(r, {depth: null}));

  console.log("********* Code Generation ************");
  let js  = genCode(r);
  console.log(js);
  fs.writeFileSync('translation.js', js);
});

