var path = require('path');
var fs = require('fs');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getFiles(srcpath){
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

function mapImages(files, url){
  var newFiles = [];
  for(var i in files){
    if(path.extname(files[i]) === '.png'){
      newFiles.push(path.join(url, files[i]));
    }
  }

  return newFiles;
}

var buildPortfolioDataObject = function(){
  var root = './public/assets/portfolio/';

  var portfolioData = {
    "portfolio":{}
  };

  // CHARACTERS, ENVIRONMENTS
  var categories = getDirectories(root);
  for(var i in categories){
    portfolioData.portfolio[categories[i]] = {};

    // CONCEPT, SKETCHES
    var specializations = getDirectories(path.join(root, categories[i]));
    for(var j in specializations){
      portfolioData.portfolio[categories[i]][specializations[j]] = {
        'cover': path.join('/assets/portfolio/', categories[i], specializations[j], 'cover.png'),
        'end': path.join('/assets/portfolio/', categories[i], specializations[j], 'end.png'),
        'projects':{}
      };

      // SPACEPRINCESS, FISHBOWLS
      var projects = getDirectories(path.join(root, categories[i], specializations[j]));
      for(var k in projects){
        portfolioData.portfolio[categories[i]][specializations[j]].projects[projects[k]] = { 'images': [], 'thumbs': [] };

        // IMAGES
        portfolioData.portfolio[categories[i]][specializations[j]].projects[projects[k]].images = mapImages(
          getFiles(path.join(root, categories[i], specializations[j], projects[k], 'images')),
          path.join('/assets/portfolio/', categories[i], specializations[j], projects[k], 'images')
        );

        // THUMBS
        portfolioData.portfolio[categories[i]][specializations[j]].projects[projects[k]].thumbs = mapImages(
          getFiles(path.join(root, categories[i], specializations[j], projects[k], 'thumbs')),
          path.join('/assets/portfolio', categories[i], specializations[j], projects[k], 'thumbs')
        );
      }
    }
  }

  return portfolioData;
};

module.exports.serializePortfolio = function(){
  console.log('serializing portfolio');
  fs.writeFile("./dist/portfolioData.json", JSON.stringify(buildPortfolioDataObject()), function(err) {
      if(err) {
          return console.log(err);
      }
  });
};
