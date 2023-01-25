const { pool } = require("../db");
// console.log(pool);


const getOrders = async (req, res) => {
  try {
    const Orders = await pool.query("SELECT * FROM Orders;");
    res.json(Orders.rows);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const Orders = await pool.query(`SELECT * FROM Orders WHERE id = $1;`, [id]);
    res.json(Orders.rows[0]);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
  }
};

// const getUserOrders = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Orders = await pool.query(
//       `SELECT * FROM Orders O JOIN users U 
//           ON O.user_id = U.id 
//             WHERE id = $1;`, [id]);
//     res.json(Orders.rows[0]);
//   } catch (err) {
//     res.status(500).send("Something went wrong, Please try again later!!");
//   }
// };

const createOrders = async (req, res) => {
  try {
    const { price, date, userid } = req.body;
    const Orders = await pool.query(
      `INSERT INTO Orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *;`,
      [price, date, userid]
    );
    res.json(Orders.rows[0]);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, date, userid } = req.body;
    // console.log(id);
    const Order = await pool.query(
      `UPDATE Orders SET price=$1, date=$2, user_id=$3 WHERE id = $4 RETURNING *;`,
      [price, date, userid, id]
    );

    res.json(Order.rows[0]);
  } catch (err) {
    res.status(500).send("put went wrong, Please try again later!!");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM Orders WHERE id = $1`, [id]);
    res.json(result);
  } catch (err) {
    res.status(500).send("Something went wrong, Please try again later!!");
    // console.log(err.message)
  }
};

module.exports = {
  getOrders,
  getOrder,
  // getUserOrders,
  createOrders,
  updateOrder,
  deleteOrder,
};
