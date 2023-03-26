const express = require("express");
const app = express();
const port = 5007;
const { User } = require("./database");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welocome to tutorial 7");
});

app.get("/users", (req, res) => {
  const getUsers = async () => {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved",
      success: true,
      users: users,
    });
  };

  getUsers();
});

app.post("/add", (req, res) => {
  const newEmail = req.body.email;
  const newFirstname = req.body.firstname;
  if (newEmail == undefined || newFirstname == undefined) {
    res.status(400).json({
      message: "Invalide Input",
      success: false,
    });
  } else {
    const addUser = async () => {
      const user = await User.create({
        email: newEmail,
        firstname: newFirstname,
      });
      res.status(200).json({
        message: "User added",
        success: true,
      });
    };

    addUser();
  }
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;

  const findUser = async () => {
    const userFind = await User.findOne({ id });

    if (!userFind) {
      res.status(400).json({
        message: `ID ${id} is not available in list`,
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
        user: userFind,
      });
    }
  };

  findUser();
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email;
  const newFirstname = req.body.firstname;

  if (newEmail == undefined && newFirstname == undefined) {
    res.status(400).json({
      message: "Invalide Input email and firstname is not available",
      success: false,
    });
  } else {
    const update = async () => {
      const findUser = await User.findOne({ id });

      if (!findUser) {
        res.status(400).json({
          message: `ID ${id} is not available in list`,
          success: false,
        });
      } else {
        if (newEmail == undefined) {
          await User.updateOne({ id }, { $set: { firstname: newFirstname } });
          res.status(200).json({
            message: "firstname updated",
            success: true,
          });
        } else if (newFirstname == undefined) {
          await User.updateOne({ id }, { $set: { email: newEmail } });
          res.status(200).json({
            message: "email updated",
            success: true,
          });
        } else {
          await User.updateOne(
            { id },
            { $set: { email: newEmail, firstname: newFirstname } }
          );

          res.status(200).json({
            message: "User updated",
            success: true,
          });
        }
      }
    };

    update();
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const deleteUser = async () => {
    const findUser = await User.findOne({ id });

    if (!findUser) {
      res.status(400).json({
        message: `ID ${id} is not available in list`,
        success: false,
      });
    } else {
      await User.deleteOne({ id });
      res.status(200).json({
        success: true,
        message: "User deleted",
      });
    }
  };

  deleteUser();
});

app.listen(port, () => {
  console.log(`The Tutorial 7 is listinf on port ${port}`);
});
