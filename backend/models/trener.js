const mongoose=require('mongoose');

const trenerSchema=new mongoose.Schema({
    ime:String,
    prezime:String,
    datum_rodjenja:Date,
    klub:{type:mongoose.Schema.Types.ObjectId,ref:'klub'}
});

module.exports=mongoose.model('trener',trenerSchema,'treneri');