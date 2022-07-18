



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



    databall = {}

    for(var i = 0; i < gene.length; i++) 
    {
      if(!(gene[i].OrthoDB  in databall)) {
        databall[gene[i].OrthoDB] = []
      }
      databall[gene[i].OrthoDB].push(gene[i].GeneSymbol.split('\\')[0])
      
    }
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

    // remove the bad keys
    badkeys.forEach(function(key) {
      delete databall[key];
    });

    // only good keys remain
    let goodKeys = Object.keys(databall);

    let searchCriteria = Object.keys(selZero);

    for(var i = 0; i < gene.length; i++) {
      let row = {
        Dmel: gene[i].Dmel,
        FBgn_Ortholog: gene[i].Ortholog,
        GeneSymbol: gene[i].GeneSymbol,
        OrthoDB: gene[i].OrthoDB
      };
      
      if((goodKeys.indexOf(row.OrthoDB) !== -1) && (searchCriteria.indexOf(row.GeneSymbol.split('\\')[0]) !== -1)) {
        newGene.push(row);  
      }
    }
      
    var str = "";
    for(var i = 0; i < newGene.length; i++) 
    {
      str += newGene[i].Dmel + "\t" + newGene[i].FBgn_Ortholog + "\t" + newGene[i].GeneSymbol + "\t" + newGene[i].OrthoDB + "\n";
    }
    const randomFile = Math.floor(Math.random() * 1000);

    fs.writeFile(
      "./public/"+randomFile+".txt",
      str,
      function (err) {
        console.log("wrote file", randomFile);
        if (err) {
          console.log(err);
          callback('failed to write file' + randomFile);
        }
      });

    callback(randomFile)
  });
}

module.exports = {webOrtholog};