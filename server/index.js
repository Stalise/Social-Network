require('dotenv').config()
const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const photosRouter = require('./routes/photo.router');
const friendRouter = require('./routes/friend.router');
const searchRouter = require('./routes/search.router');
const newsRouter = require('./routes/news.router');
const chatRouter = require('./routes/chat.router');

app.use(cors({ origin: 'http://localhost:3000', credentials: true, }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())

app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', photosRouter)
app.use('/api', friendRouter)
app.use('/api', searchRouter)
app.use('/api', newsRouter)
app.use('/api', chatRouter)

app.get('/', (req, res) => {
   res.send('server is ready.')
})

app.listen(PORT, () => console.log(`Server is working on PORT: ${PORT}`))