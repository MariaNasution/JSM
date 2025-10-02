const employeeModel = require("../models/employeeModel");

const employeeController = {
  // Ambil semua data karyawan
  getAllEmployees: async (req, res) => {
    try {
      const employees = await employeeModel.findMany();
      res.json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch employees." });
    }
  },

  // Ambil satu karyawan berdasarkan ID
  getEmployeeById: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await employeeModel.findUnique({
        where: { id: parseInt(id) },
      });
      if (!employee) {
        return res.status(404).json({ error: "Employee not found." });
      }
      res.json(employee);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch employee." });
    }
  },

  // Tambah karyawan baru
  createEmployee: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        placeOfBirth,
        birthdate,
        gender,
        religion,
        maritalStatus,
        bloodType,
        email,
        phoneNumber,
        companyName,
        employeeId,
        division,
        department,
        unit,
        jobLevel,
        employeeStatus,
        joinDate,
        signDate,
        endEmploymentStatusDate,
      } = req.body;

      const newEmployee = await employeeModel.create({
        data: {
          name: `${firstName} ${lastName}`,
          firstName,
          lastName,
          placeOfBirth,
          birthdate: birthdate ? new Date(birthdate) : null,
          gender,
          religion,
          maritalStatus,
          bloodType,
          email,
          phoneNumber,
          companyName,
          employeeId,
          division,
          department,
          unit,
          jobLevel,
          status: employeeStatus,
          joinDate: new Date(joinDate),
          signDate: signDate ? new Date(signDate) : null,
          endEmploymentStatusDate: endEmploymentStatusDate
            ? new Date(endEmploymentStatusDate)
            : null,
        },
      });

      res.status(201).json(newEmployee);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: "Failed to create employee. " + err.message });
    }
  },

  // Perbarui data karyawan
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        placeOfBirth,
        birthdate,
        gender,
        religion,
        maritalStatus,
        bloodType,
        email,
        phoneNumber,
        companyName,
        employeeId,
        division,
        department,
        unit,
        jobLevel,
        employeeStatus,
        joinDate,
        signDate,
        endEmploymentStatusDate,
      } = req.body;

      const updatedEmployee = await employeeModel.update({
        where: { id: parseInt(id) },
        data: {
          name: `${firstName} ${lastName}`,
          firstName,
          lastName,
          placeOfBirth,
          birthdate: birthdate ? new Date(birthdate) : null,
          gender,
          religion,
          maritalStatus,
          bloodType,
          email,
          phoneNumber,
          companyName,
          employeeId,
          division,
          department,
          unit,
          jobLevel,
          status: employeeStatus,
          joinDate: new Date(joinDate),
          signDate: signDate ? new Date(signDate) : null,
          endEmploymentStatusDate: endEmploymentStatusDate
            ? new Date(endEmploymentStatusDate)
            : null,
        },
      });
      res.json(updatedEmployee);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: "Failed to update employee. " + err.message });
    }
  },

  // Hapus karyawan
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      await employeeModel.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: "Failed to delete employee. " + err.message });
    }
  },
};

module.exports = employeeController;
