import { Student } from './student.interface';
import { StudentModel } from './student.model';

// get student
const getAllStudent = async () => {
  const result = await StudentModel.find();
  return result;
};

// get single student
const getSingleStudent = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};
// delete student from db
const deleteStudent = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
