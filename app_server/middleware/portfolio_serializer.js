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

function getFile(path){
  var obj = JSON.parse(fs.readFileSync('file', 'utf8'));
}

var buildPortfolioDataObject = function(){
  var root = './public/assets/portfolio/';

  var portfolioData = {
    "portfolio":{}
  };

  portfolioData.portfolio.categories = [];

  // CHARACTERS, ENVIRONMENTS
  var categoryDirs = getDirectories(root);
  for(var i in categoryDirs){
    portfolioData.portfolio.categories.push({'name':categoryDirs[i]});
    portfolioData.portfolio.categories[i].subcategories = [];

    // CONCEPT, SKETCHES
    var subcategoryDirs = getDirectories(path.join(root, categoryDirs[i]));
    for(var j in subcategoryDirs){
      portfolioData.portfolio.categories[i].subcategories.push({
        'name':subcategoryDirs[j],
        'cover': path.join('/assets/portfolio/', categoryDirs[i], subcategoryDirs[j], 'cover.png'),
        'projects':[]
      });

      // SPACEPRINCESS, FISHBOWLS
      var projects = getDirectories(path.join(root, categoryDirs[i], subcategoryDirs[j]));
      for(var k in projects){

        var plaqueObject;
        try{
          plaqueObject = JSON.parse(fs.readFileSync(
            path.join(root, categoryDirs[i], subcategoryDirs[j], projects[k], 'plaque.json')
          ));
        }
        catch(ex){
          plaqueObject = null;
        }

        portfolioData.portfolio.categories[i].subcategories[j].projects.push({
          'name': projects[k],
          'position': k,
          'plaque': plaqueObject
        });

        // IMAGES
        portfolioData.portfolio.categories[i].subcategories[j].projects[k].imagePaths = mapImages(
          getFiles(path.join(root, categoryDirs[i], subcategoryDirs[j], projects[k], 'images')),
          path.join('/assets/portfolio/', categoryDirs[i], subcategoryDirs[j], projects[k], 'images')
        );

        // THUMBS
        portfolioData.portfolio.categories[i].subcategories[j].projects[k].thumbImagePaths = mapImages(
          getFiles(path.join(root, categoryDirs[i], subcategoryDirs[j], projects[k], 'thumbs')),
          path.join('/assets/portfolio', categoryDirs[i], subcategoryDirs[j], projects[k], 'thumbs')
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
