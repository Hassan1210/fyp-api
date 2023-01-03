const mongoose = require('mongoose')

const schema = mongoose.Schema({
  uId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  displayName: String,
  companyId: {
    type: String,
    ref: mongoose.Schema.Types.ObjectId,
    ref: 'company',
  },
  registedMachines: [String],
  grade: String,
  gender: String,
  saluation: String,
  BankAccountNo: String,
  inviteStatus: {type: Number, default: 1} ,
  inviteEmail: {type: String},
  shareLocation: {type: Boolean, default: true},
  roleId: {
    type: String,
    ref: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
  },
  gId: {
    type: String,
    ref: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift',
    //   required: [true, 'Shift required']
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'designation',
    //    required: [true, 'Desgnation required']
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
    //   required: [true, 'Department required']
  },
  urlKey: { type: mongoose.Schema.Types.ObjectId, ref: 'urlCredentials' },
  hrId: {
    type: String,
  },
  logId: {
    type: String,
    // required: [true, 'Attendance Id required']
  }, // Attendance Log Id, GLOG
  machineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'realtimeMahinces',
    // required: [true, 'Attendance Id required']
  },
  machines: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'realtimeMahinces',
        // required: [true, 'Attendance Id required']
      },
    },
  ],
  series: String,
  deleted_at: {
    type: Date,
    default: null,
  },
  faceLoginEnabled: {type: Boolean, default: true} ,
  fenceLoginEnabled: {type: Boolean, default: true},
  outsideFence: {type: Boolean, default: false},
  getPlace:Boolean,
  hideGeofence:Boolean,
  pushToFirebase:Boolean,
})
module.exports = mongoose.model('userDetails', schema)