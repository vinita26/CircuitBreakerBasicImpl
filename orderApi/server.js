const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const opossum = require('opossum');

const fallbackUsers = [
    {id: 1, name:"User11"},
    {id: 2, name:"User21"},
    {id: 3, name:"User31"},
];

const circuitBreaker = new opossum(
    async ()=> await axios.get('http://localhost:4001/'),
    {
        timeout: 500,
        errorThresholdPercentage: 50,
        resetTimeout: 5000
    }
);

circuitBreaker.fallback(()=> Promise.resolve({
    data: fallbackUsers
}))

const orders = [
    {id: 1, name:"Order1"},
    {id: 2, name:"Order2"},
    {id: 3, name:"Order3"},
]

app.use(cors());
app.use(express.json());

app.get('/', async (req,res)=> {
    try {
        const resp = await circuitBreaker.fire();
    if(resp.data){
        res.status(200).send({orders, users: resp.data});
    }else {
        res.status(200).send({orders, error: error});
    }
    } catch (error) {
        res.status(200).send({orders, error: error});
    }
    
    
})
app.listen(4002, ()=> {
    console.log('User port is running at port', 4002);
})