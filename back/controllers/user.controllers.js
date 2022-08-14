const clientPSQL = require("../db");

class UserController {
  async createUser(req, res) {
    const { name, nickname } = req.body;
    const query = {
      text: `INSERT INTO users(name, nickname) VALUES($1, $2) RETURNING *`,
      array: [name, nickname],
    };

    if (name && nickname) {
      const newUser = await clientPSQL
        .query(query.text, query.array)
        .then((user) => {
          console.log("Table created successfully!");
          return user.rows[0];
        })
        .catch((err) => {
          console.log(err);
        });
      res.send(newUser);
    }else{
        res.send("Table not created successfully!");
    }
  }

  async getUsers(req, res) {
    const query = `SELECT * FROM users`;
    const users = await clientPSQL
      .query(query)
      .then((res) => {
        const rows = res.rows;
        return rows;
      })
      .catch((err) => {
        console.log(err);
      });

    res.send(users || `not work or not connect`);
  }
  async getUserById(req, res) {
    const id = req.params.id;
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      array: [id],
    };
    const user = await clientPSQL
      .query(query.text, query.array)
      .then((res) => {
        const rows = res.rows;
        return rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
    res.send(user || `not find`);
  }
  async updateUserById(req, res) {
    const { name, nickname, id } = req.body;
    const query = {
      text: `UPDATE users set name = $1, nickname = $2 WHERE id = $3 RETURNING *`,
      array: [name, nickname, id],
    };
    const user = await clientPSQL
      .query(query.text, query.array)
      .then((res) => {
        const rows = res.rows;
        return rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
    res.send(user || `not find`);
  }
  async deleteUserById(req, res) {
    const id = req.params.id;
    const query = {
      text: `DELETE FROM users WHERE id = $1`,
      array: [id],
    };

    const user = await clientPSQL
      .query(query.text, query.array)
      .then((res) => {
        const rows = res.rows;
        return rows[0];
      })
      .catch((err) => {
        console.log(err);
      });

    res.send(user);
  }
}

module.exports = new UserController();
