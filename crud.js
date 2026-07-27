const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/endterm")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Error ahead:", err);
  });

//schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },

  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },

  branch: {
    type: String,
    enum: ["CSE", "IT", "ECE"],
  },

  enrolledDate: {
    type: Date,
    default: Date.now,
  },
});

//model
const Student = mongoose.model("student", studentSchema);

//crud

const student = new Student({
  name: "second Doe",
  email: "mainly.jhj@gmail.com",
  rollNo: 789,
});
student.save().then(() => {
  console.log("Data saved successfully");
});

// read;
Student.findOne({
  rollNo: 12345,
}).then((e) => {
  console.log("Data : ", e);
});

//update

Student.updateOne(
  {
    rollNo: 12345,
  },
  {
    $set: {
      name: "saya ",
    },
  },
)
  .then(() => {
    console.log("Updated Succesfully ");
  })
  .catch((e) => {
    console.log("Error occured :", e);
  });

//delete

Student.deleteOne({
  rollNo: 12345,
}).then(() => {
  console.log("Deleted Successfully");
});

Student.find().then((e) => {
  console.log("Data : ", e);
});
