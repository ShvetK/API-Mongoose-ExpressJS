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
    try {
      const users = await User.find();
      res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: users,
      });
    } catch (error) {
      res.status(404).json({
        message: "Somthing went wrong......",
      });
    }
  };

  getUsers();
});

app.post("/add", (req, res) => {
  const newEmail = req.body.email;
  const newFirstname = req.body.firstName;
  if (
    newEmail == undefined ||
    newFirstname == undefined ||
    newEmail == "" ||
    newFirstname == ""
  ) {
    res.status(400).json({
      message: "Invalide Input",
      success: false,
    });
  } else {
    const addUser = async () => {
      const user = await User.create({
        email: newEmail,
        firstName: newFirstname,
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
    try {
      const userFind = await User.findOne({ _id: id });
      if (userFind == null || userFind == undefined) {
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
    } catch (error) {
      res.status(400).json({
        message: `ID ${id} is not available in list`,
        success: false,
      });
    }
  };

  findUser();
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email;
  const newFirstname = req.body.firstName;

  if (
    (newEmail == undefined && newFirstname == undefined) ||
    newEmail == "" ||
    newFirstname == ""
  ) {
    res.status(400).json({
      message: "Invalide Input email or firstname is not available",
      success: false,
    });
  } else {
    const update = async () => {
      try {
        const findUser = await User.findById(id);
        console.log(findUser);

        if (!findUser) {
          res.status(400).json({
            message: `ID ${id} is not available in list`,
            success: false,
          });
        } else {
          if (newFirstname && newFirstname != "" && newEmail == "") {
            await User.updateOne(
              { _id: id },
              { $set: { firstName: newFirstname } }
            );
            res.status(200).json({
              message: "firstName updated",
              success: true,
            });
          } else if (newEmail && newEmail != "" && newFirstname == "") {
            await User.updateOne({ _id: id }, { $set: { email: newEmail } });
            res.status(200).json({
              message: "email updated",
              success: true,
            });
          } else {
            await User.updateOne(
              { _id: id },
              { $set: { email: newEmail, firstName: newFirstname } }
            );

            res.status(200).json({
              message: "User updated",
              success: true,
            });
          }
        }
      } catch (error) {
        res.status(400).json({
          message: `ID ${id} is not available in list`,
          success: false,
        });
      }
    };

    update();
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const deleteUser = async () => {
    try {
      const findUser = await User.findById(id);

      if (!findUser) {
        res.status(400).json({
          message: `ID ${id} is not available in list`,
          success: false,
        });
      } else {
        await User.deleteOne({ _id: id });
        res.status(200).json({
          success: true,
          message: "User deleted",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: `ID ${id} is not available in list`,
        success: false,
      });
    }
  };

  deleteUser();
});

app.listen(port, () => {
  console.log(`The Tutorial 7 is listing on port ${port}`);
});
