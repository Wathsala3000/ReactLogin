const mongoose = require("mongoose");
module.exports.db = () => {
    const connectionParams = {
        useNewUrlParser : true,
        useUnifiedTopology: true
    };

    try{
        mongoose.connect(process.env.db, connectionParams);
        console.log('Connected to DB successfully');
    }catch(error){
        console.log(error);
        console.log('DB connection failed');
    }
}