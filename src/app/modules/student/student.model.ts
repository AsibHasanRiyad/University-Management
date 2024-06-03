import { Guardian, LocalGuardian, Name, TStudent } from './student.interface';
import { Schema, model } from 'mongoose';

// name Schema
const studentNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not be more than 20 character'],
    trim: true,
    // validate: {
    //   validator: function (value: String) {
    //     if (typeof value !== 'string' || value.length === 0) {
    //       return '';
    //     }
    //     const result = value.charAt(0).toUpperCase() + value.slice(1);
    //     return result === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} in not a valid last name',
    // },
  },
});
// guardian Schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String },
  fatherContact: { type: Number },
  fatherOccupation: { type: String },
  motherName: { type: String },
  motherContact: { type: Number },
  motherOccupation: { type: String },
});
// local guardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  contact: { type: Number },
  occupation: { type: String },
  address: { type: String },
});
// main schema
const studentSchema = new Schema<TStudent>({
  id: { type: String, required: [true, 'Id is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    unique: true,
    ref: 'UserModel',
  },
  name: {
    type: studentNameSchema,
    required: [true, ' Name Field is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        " 'Gender filed can only be the following - 'male ', 'female' or 'other' ",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type',
    // },
  },
  emergencyContactNumber: {
    type: Number,
    required: [true, 'Emergency contact is required'],
  },
  profileImage: { type: String },
  admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  bloodGroup: {
    type: String,
    enum: {
      values: [
        'A',
        'A+',
        'A-',
        'B',
        'B+',
        'B-',
        'AB',
        'AB+',
        'AB-',
        'O',
        'O+',
        'O-',
      ],
      message: '{VALUE} is not valid Blood Group',
    },
  },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// -------- query middleware -----------
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
  next();
});

export const StudentModel = model<TStudent>('Student', studentSchema);
