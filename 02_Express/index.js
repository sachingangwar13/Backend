import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";

const app = express()
const port = 3000
const morganFormat = ":method :url :status :response-time ms";


app.use(express.json())

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let friendsName = []
let nextIndex = 1

// add a new Friend
app.post('/friends', (req , res) => {

    const {name , age} = req.body
    const newFriend = {id:nextIndex++ , name , age}

    friendsName.push(newFriend)
    res.status(201).send(friendsName)
})

// get all friends
app.get('/friends' ,(req , res) => {
    res.status(200).send(friendsName)
})

// get friend by ID
app.get('/friends/:id' , (req,res) => {
    const friend = friendsName.find(friend => friend.id === parseInt(req.params.id))

    if(!friend){
        return res.status(404).send('Friend not found')
    }

    res.status(200).send(friend)
})

// update friend
app.put('/friends/:id' , (req , res) => {
    const friend = friendsName.find(f => f.id === parseInt(req.params.id))

    if(!friend){
        return res.status(404).send('Friend not found')
    }

    const {name , age} = req.body
    friend.name = name
    friend.age = age
    res.status(200).send('done')
})

// delete friend 

app.delete('/friends/:id' , (req, res) => {

    const index = friendsName.findIndex(f => f.id === parseInt(req.params.id))

    if(index == -1){
        return res.status(404).send('friend not found')
    }

    friendsName.splice(index , 1)

    res.status(200).send(friendsName)

})

app.listen(port , () => {
    console.log(`Server is running at http://localhost:${port}`)
})