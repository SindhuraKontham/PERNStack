
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const {userRouter} = require("./routes/users")
const {orderRouter} = require("./routes/orders")


const app = express();

app.use(express.json());

app.use("/users", userRouter)

app.use("/orders", orderRouter)

const PORT = process.env.PORT;
// console.log(PORT)
app.listen(PORT,()=>{
    console.log(`Server is connected to port ${PORT} and is running!`)
})

