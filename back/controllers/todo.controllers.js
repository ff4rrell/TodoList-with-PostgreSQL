const clientPSQL = require("../db");

class TodoControler {
  async createTodo(req, res) {
    const { title, user_id } = req.body;
    const query = {
      text: `INSERT INTO todos(title, isdone, user_id) VALUES($1, $2, $3) RETURNING *`,
      array: [title, false, user_id],
    };
    if (title) {
      const newTodo = await clientPSQL
        .query(query.text, query.array)
        .then((todo) => {
          console.log("Table created successfully!");
          return todo.rows[0];
        });

      res.send(newTodo);
    } else {
      res.send("Table not created successfully!");
    }
  }

  async getTodos(req, res) {
    const query = `SELECT * FROM todos`;
    const todos = await clientPSQL.query(query).then((todos) => {
      const rows = todos.rows;
      console.log(rows);
      return rows;
    });
    res.send(todos);
  }

  async getTodoById(req, res) {
    const id = req.params.id;
    const query = {
      text: `SELECT * FROM todos WHERE id = $1 RETURNING *`,
      array: [id],
    };
    const todo = await clientPSQL
      .query(query.text, query.array)
      .then((todo) => {
        const rows = todo.rows[0];
        return rows;
      });
    res.send(todo);
  }

  async updateTodoById(req, res) {
    const { id, isdone, title } = req.body;
    const query = {};
    if (title) {
      query.text = `UPDATE todos SET name = $3, isdone = $2 WHERE id = $1 RETURNING *`;
      query.array = [id, isdone, title];
    } else {
      query.text = `UPDATE todos SET isdone = $1 WHERE id = $2 RETURNING *`;
      query.array = [isdone, id];
    }
    const todo = await clientPSQL.query(query.text, query.array).then((todo) => {
      const rows = todo.rows[0];
      return rows;
    });
    res.send(todo);
  }

  async deleteTodoById(req, res) {
    const id = req.params.id;
    const query = {
      text: `DELETE FROM todos WHERE id = $1 RETURNING *`,
      array: [id],
    };
    const todo = await clientPSQL.query(query.text, query.array).then((todo) => {
      const rows = todo.rows[0];
      return rows;
    });

    res.send(todo);
  }
}

module.exports = new TodoControler();
