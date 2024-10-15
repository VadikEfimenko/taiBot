import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CondoSchema = new Schema({
    name: String,
    description: String,
    city: String,
    position: String,
    area: String,
    year: String,
    floors: Number,
    pool: Number,
    gym: Number,
    parking: Number,
    security: Number,
    concierge: Number,
    jacuzzi: Number,
    grill: Number,
    sauna: Number,
    garden: Number,
    childrenArea: Number,
    lift: Number,
    tennisCourt: Number,
    buildings: Number,
    units: Number,
    html: String,
    active: Boolean,
    files: {
        type: [Schema.Types.ObjectId],
        ref: 'GridFile'
    },
});

const Condo = mongoose.model('Condo', CondoSchema);

export default Condo;