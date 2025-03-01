import express  from 'express'
import connectDB from './config/mongodb.js'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import expenseRouter from "./routes/expenseRoutes.js";



const PORT = process.env.PORT || 4000
const app = express() 

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user', userRouter)
app.use("/api/expenses", expenseRouter)


app.get('/' , (req,res) => res.send("API Working "))

app.listen(PORT , () => console.log('Server Running on Port '+ PORT) );