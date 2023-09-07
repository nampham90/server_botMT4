const AbstractProcess = require('../abstractProcess/AbstractProcess');
const { ObjectId }  = require('mongodb');

class Tmt010SaveFileProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async saveFile(data,session) {
      return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const TMT010 = db.models.tmt010_file;
        const User = db.models.user
        let newTmt010 = new TMT010({
            userId: ObjectId(data.userID),
            filename: data.fileInformation.filename,
            path: data.fileInformation.path,
            typefile: data.fileInformation.mimetype,
            sizefile: data.fileInformation.size,
            strrsrv1: "avatar", // trường dự bị 1 
            strrsrv2: "",// trường dự bị 2 
            strrsrv3: "", // trường dự bị 3 
            strrsrv4: "", // trường dự bị 4 
            strrsrv5: "" // trường dự bị 5
        })
        let rs = await TMT010.collection.insertOne(newTmt010, { session });
        // update lại avatar
        await User.collection.updateOne({
            _id: ObjectId(data.userID)
        },{$set: {
             avatar: ObjectId(rs.insertedId)
        }}, {session});

        // new user vơi avatar mơi

        let u = await User.findOne({_id: ObjectId(data.userID)},{password:0,menulist:0,phongban_id:0,role_id:0})
        .populate('avatar');
        if(u) {
            return u;
        } else {
            return null;
        }
    }
}
module.exports = Tmt010SaveFileProcess;
