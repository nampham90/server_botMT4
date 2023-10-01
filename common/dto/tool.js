const { ObjectId} = require('mongodb');
function getValueObjectID(values) {
   if(values == undefined) {
      return "";
   }
   if(typeof values == "number") {
      return values+"";
   }
   return values.toString();
}

module.exports = {
    getValueObjectID
}