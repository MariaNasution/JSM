const employeeModel = require("../models/employeeModel");
const userModel = require("../models/userModel");
// const bcrypt = require('bcryptjs'); // bcryptjs jika ingin menggunakan hashing

const employeeController = {
  getAllEmployees: async (req, res) => {
    try {
      const employees = await employeeModel.findMany({
        include: { user: true },
      });
      const flatEmployees = employees.map((emp) => ({
        ...emp,
        role: emp.user ? emp.user.role : "N/A",
        username: emp.user ? emp.user.username : "N/A",
      }));
      res.json(flatEmployees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch employees." });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await employeeModel.findUnique({
        where: { id: parseInt(id) },
        include: { user: true },
      });
      if (!employee) {
        return res.status(404).json({ error: "Employee not found." });
      }
      res.json({
        ...employee,
        username: employee.user?.username || "",
        role: employee.user?.role || "",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch employee." });
    }
  },

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
        username,
        password,
        role,
      } = req.body;

      const existingUser = await userModel.findUnique({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists." });
      }

      // 1. Buat Employee
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

      // 2. Buat User Account (Relasi otomatis)
      // const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        data: {
          username,
          password,
          email: email,
          role: role,
          employeeId: newEmployee.id,
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
        username,
        password,
        role,
      } = req.body;

      const employeeDataUpdate = {
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
      };

      const updatedEmployee = await employeeModel.update({
        where: { id: parseInt(id) },
        data: employeeDataUpdate,
      });

      // Update User Account terkait
      const userUpdateData = {
        username: username,
        email: email,
        role: role,
      };
      if (password && password.length > 0) {
        // userUpdateData.password = await bcrypt.hash(password, 10);
        userUpdateData.password = password;
      }

      await userModel.updateMany({
        where: { employeeId: updatedEmployee.id },
        data: userUpdateData,
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
      // 1. Hapus User Account terkait
      await userModel.deleteMany({ where: { employeeId: parseInt(id) } });
      // 2. Kemudian hapus Employee
      await employeeModel.delete({ where: { id: parseInt(id) } });

      res.status(204).end();
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: "Failed to delete employee. " + err.message });
    }
  },

  // UPDATE ROLE KHUSUS (Dari Modal Dashboard)
  updateRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Update User Role
      await userModel.updateMany({
        where: { employeeId: parseInt(id) },
        data: { role },
      });

      res.json({ message: "Role updated successfully." });
    } catch (err) {
      res.status(400).json({ error: "Failed to update role. " + err.message });
    }
  },
};

module.exports = employeeController;
