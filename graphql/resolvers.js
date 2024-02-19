const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (err) {
        throw new Error(err);
      }
    },
    getEmployeeById: async (_, { _id }) => {
      try {
        const employee = await Employee.findById(_id);
        return employee;
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
          throw new Error('User not found');
        }

        if (user.password !== password) {
          throw new Error('Incorrect password');
        }

        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          throw new Error('Username or email already exists');
        }

        const user = new User({ username, email, password });
        await user.save();
        
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      try {
        const employee = new Employee({ first_name, last_name, email, gender, salary });
        await employee.save();
        return employee;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateEmployee: async (_, { _id, first_name, last_name, email, gender, salary }) => {
      try {
        const updateFields = {};
        if (first_name) updateFields.first_name = first_name;
        if (last_name) updateFields.last_name = last_name;
        if (email) updateFields.email = email;
        if (gender) updateFields.gender = gender;
        if (salary) updateFields.salary = salary;

        const employee = await Employee.findByIdAndUpdate(_id, updateFields, { new: true });
        return employee;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteEmployee: async (_, { _id }) => {
      try {
        const employee = await Employee.findByIdAndDelete(_id);
        return employee;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
