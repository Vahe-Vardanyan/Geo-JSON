//---------------------------------------------
var mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
    name: { type: String },
    // pointType: { type: Number },
    geo: {
        type: { type: String },
        coordinates: { type: Array }
    }
});
citySchema.index({ geo: '2dsphere' });
// citySchema.index({ location: '2dsphere' });
const CityModel = mongoose.model('City', citySchema);
module.exports = CityModel;