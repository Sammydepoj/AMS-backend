const mongoose = require("mongoose")
const getAllParticipants = async()=>{
try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
} catch (error) {
    console.log(error)
}
}


module.exports = getAllParticipants