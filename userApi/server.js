const express = require('express');
const cors = require('cors');
const app = express();

const users = [
    {id: 1, name:"User1"},
    {id: 2, name:"User2"},
    {id: 3, name:"User3"},
]

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> {
    res.status(200).send(users);
})
app.listen(4001, ()=> {
    console.log('User port is running at port', 4001);
})