const express = require('express')
const env = require('dotenv')
const app = express()
require('./db')
app.use(express.json())
env.config()
const path = require('path')
const cors= require('cors')


const authRouter = require('./routes/auth')
const adminAuthRouter = require('./routes/admin/auth')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const cartRouter= require('./routes/cart')
const initialDataRouter =require('./routes/admin/initialData')



app.use(cors({
    origin: '*'
}))
app.use('/public',express.static(path.join(__dirname, 'uploads')))


app.use('/api', authRouter)
app.use('/api', adminAuthRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', initialDataRouter)







app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

