const fs = require('fs');

module.exports = {
    writeData:function(dataFile){
        let data = JSON.stringify(dataFile);
        fs.writeFileSync('./marklist.json', data);
    }
}