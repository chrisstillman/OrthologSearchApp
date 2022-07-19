



function webOrtholog(webValues, callback) {
    console.log("TestP!",webValues)
    const csv = require("csv-parser");
    const fs = require("fs");
    const { prependOnceListener } = require("process");
    const prompt = require('prompt-sync')({sigint: true});


    var gene = [];

var newGene = [];
var selection = [];
var selName = [];
var selZero = {}

fs.createReadStream("orthologSearch.csv")
  .pipe(csv())
  .on("data", (row) => {
    var stringify = JSON.stringify(row);
    stringify = stringify.replace("\ufeff", "");
    var reParsed = JSON.parse(stringify);
    gene.push(reParsed);
  })
    
  .on("end", () => {
    console.log("csv pipe ended");
    var specList = ["Dmoj", "Dana", "Dvir", "Dpse", "Dsec", "Dwil", "Dper", "Dyak", "Dsim", "Dere", "Dgri"];

    // one zero list
    for(var i = 0; i < specList.length; i++) 
    {
    //   let guess = prompt(console.log(specList[i]));
    //   guess = Number(guess);
      selection[i] = webValues[i];
      if(webValues[i] == 1)
      {
        selName[i] = specList[i];
        selZero[specList[i]] = 0;
      }
    }
    console.log('one zero list finishied');


    console.log('databall start');
    databall = {}
    for(var i = 0; i < gene.length; i++) 
    {
      if(!(gene[i].OrthoDB  in databall)) {
        databall[gene[i].OrthoDB] = []
      }
      databall[gene[i].OrthoDB].push(gene[i].GeneSymbol.split('\\')[0])
      
    }
    console.log('databall end');

    console.log('find bad keys start');
    // find the bad keys
    let badkeys = []
    for (let key in databall) {
      // make a new dictionary of zero count keys
      let counts = JSON.parse(JSON.stringify(selZero)); // deep copy selZero from line 35
      
      let genesList = databall[key] // ex [dvir, dvir, dmoj, dere]
      
      // accumulate counts for each gene
      for(let i = 0; i < genesList.length; i++) {
        if((genesList[i] in counts)) {
          counts[genesList[i]] += 1;
        }
      }
      // capture the bad keys, ie those counts which aren't exatly 1 each
      for(let geneKey in counts) {
        if(counts[geneKey] !== 1) {
          badkeys.push(key);
        }
      }
    }
    console.log('find bad keys end');

    console.log('remove bad keys start');
    // remove the bad keys
    badkeys.forEach(function(key) {
      delete databall[key];
    });
    console.log('remove bad keys end');

    console.log('good key search start');
    // only good keys remain
    //let goodKeys = Object.keys(databall); // using databall.hasOwnProperty(key) instead .... dictionary lookup w/ hash, O(1)
    //let searchCriteria = Object.keys(selZero); // using selZero.hasOwnProperty(key) .. same as above

    for(var i = 0; i < gene.length; i++) {
      let row = {
        Dmel: gene[i].Dmel,
        FBgn_Ortholog: gene[i].Ortholog,
        GeneSymbol: gene[i].GeneSymbol,
        OrthoDB: gene[i].OrthoDB
      };
      
      if((databall.hasOwnProperty(row.OrthoDB)) && (selZero.hasOwnProperty(row.GeneSymbol.split('\\')[0]))) {
        newGene.push(row);  
      }
    }
    console.log('good key search end');
      
    console.log('string build begin');
    var str = "";
    for(var i = 0; i < newGene.length; i++) 
    {
      str += newGene[i].Dmel + "\t" + newGene[i].FBgn_Ortholog + "\t" + newGene[i].GeneSymbol + "\t" + newGene[i].OrthoDB + "\n";
    }
    console.log('string build end');

    callback(str);

    /*
    const randomFile = Math.floor(Math.random() * 1000);

    fs.writeFile(
      "./public/"+randomFile+".txt",
      str,
      function (err) { 
        if (err) {
          console.log(err);
          console.log("failed to write file, expect a timeout");
        } else {
          console.log("wrote file", randomFile);
          callback(randomFile)
        }
      });
      */
  });
}

module.exports = {webOrtholog};