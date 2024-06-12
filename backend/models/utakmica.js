const mongoose=require('mongoose');

const utakmicaSchema=new mongoose.Schema({
    lokacija:{type:mongoose.Schema.Types.ObjectId,ref:'adresa'},
    stadion:{type:mongoose.Schema.Types.ObjectId,ref:'stadion'},
    termin:Date,
    rezultat:String,
    domacin:{type:mongoose.Schema.Types.ObjectId,ref:'klub'},
    gost:{type:mongoose.Schema.Types.ObjectId,ref:'klub'},
    glavni_sudac:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
    pomocni_sudac1:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
    pomocni_sudac2:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
    cetvrti_sudac:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
    var_sudac:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
    avar_sudac:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
    delegat:{type:mongoose.Schema.Types.ObjectId,ref:'sudija'},
});

module.exports=mongoose.model('utakmica',utakmicaSchema,'utakmice');