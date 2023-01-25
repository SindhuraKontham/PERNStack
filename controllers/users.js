const { pool } = require("../db");
// console.log(pool);
const {body, validationResult} = require("express-validator");

const getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users;");
    res.json(users.rows);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    res.json(users.rows[0]);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
  }
};

const getUserOrders = async (req, res) => {
    try {
      const { id } = req.params;
      const Orders = await pool.query(
        `SELECT * FROM Orders JOIN users  
            ON Orders.user_id = users.id 
              WHERE orders.user_id = $1;`, [id]);
      res.json(Orders.rows);
    } catch (err) {
      res.status(500).send("Something went wrong, Please try again later!!");
      console.log(err.message)
    }
  };


const createUser = async (req, res) => {
    try {
    const { firstName, lastName, age } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    else{
    const users = await pool.query(
      `INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;`,
      [firstName, lastName, age]
    );
    res.json(users.rows[0]);
}
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    // console.log(id);
    const user = await pool.query(
      `UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id = $4 RETURNING *;`,
      [firstName, lastName, age, id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send("put went wrong, Please try again later!!");
  }
};

const updateInActiveUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
    //   console.log(id);
      const user = await pool.query(
        `UPDATE users  
        SET active = $1
        WHERE id IN (select U.id from users U
            LEFT JOIN orders O 
            ON O.user_id = U.id
            WHERE 
            U.id = $2 AND
            O.price IS NULL)
        RETURNING *;`,
        [active,id]
      );
  
      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).send("put went wrong, Please try again later!!");
    //   console.log(err.message)
    }
  };


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    res.json(result);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
    // console.log(err.message)
  }
};

module.exports = {
  getUsers,
  getUser,
  getUserOrders,
  createUser,
  updateUser,
  updateInActiveUser,
  deleteUser,
};
