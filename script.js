// const http = require('http');
// const { json } = require('stream/consumers');

// const users = [
//     {
//         'id': 1,
//         'name': 'ahmed',
//         'age': 20,
//     },
//     {
//         'id': 2,
//         'name': 'Yasser',
//         'age': 25,
//     },
//     {
//         'id': 3,
//         'name': 'Mustafa',
//         'age': 28,
//     },
// ];

// const app = http.createServer((req, res) => {
//     if (req.url === '/' && req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(users));
//         console.log('GET method');
//     } else if (req.url === '/' && req.method === 'POST') {
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk;
//         });
//         req.on('end', () => {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             const newUser = JSON.parse(body);
//             users.push(newUser);
//             res.end(JSON.stringify(users));
//             console.log('ADD Done');
//         });
//     } else if (req.url === '/' && req.method === 'PUT') {
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk;
//         });
//         req.on('end', () => {
//             const updatedUser = JSON.parse(body);
//             const userId = updatedUser.id;
//             const index = users.findIndex((user) => user.id === userId);
//             if (index !== -1) {
//                 users[index] = updatedUser;
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify(users));
//                 console.log('UPDATE Done');
//             }
//         });
//     }else if(req.url === '/' && req.method === 'DELETE'){
//         body="" ; 
//         req.on("data" , (chunk)=>{
//             body += chunk ;
//         });
//         req.on("end" , ()=>{
//             const deletedUser = JSON.parse(body) ; 
//             let userId = deletedUser.id ;
//             const index = users.findIndex((user)=> user.id ===  userId) ;
//             if (index !== -1) {
//                 users.splice(index , 1) ;
//                 res.writeHead(200 , {"Contect-type":"application/json"});
//                 res.end(JSON.stringify(users))
//             }else(
//                 res.end('user not found')
//             )
//         })
//     }else if(req.url.startsWith('/search') && req.method ==='GET'){
//         const urlName = new URLSearchParams(req.url.split("?")[1])  ;
//         const searchName = urlName.get("name")
//         if (searchName) {
//             const ResName = users.filter((user)=> user.name.toLowerCase().includes(searchName.toLowerCase())) ;
//             res.writeHead(200 , {'Content-type':'application/json'})
//             res.end(JSON.stringify(ResName))
//         }
//     }
// }).listen(3000);


// #################################################################
// ######################## Using Express ##########################
// #################################################################


const express = require("express") ;
const app = express() ; 


let users = [
    {
        'id': 1,
        'name': 'ahmed',
        'age': 20,
    },
    {
        'id': 2,
        'name': 'Yasser',
        'age': 25,
    },
    {
        'id': 3,
        'name': 'Mustafa',
        'age': 28,
    },
];


app.get("/" , (req,res)=>{
    res.send(users);
}).post('/' , (req , res)=>{
    let body = "" ;
    req.on("data" , (chunk)=>{
        body += chunk ;
    })
    req.on("end" , ()=>{
        let NewUser = JSON.parse(body)
        let editeUser = users.find((user)=> user.id == NewUser.id)
        if(editeUser){
            Object.assign(existingUser, NewUser);
        }else{
        console.log(NewUser);
        users.push(NewUser) ;
        }
        res.send(JSON.stringify(users)) ;
    })
}).delete('/' , (req , res)=>{
    let body = "" ;
    req.on('data' , (chunk)=>{
        body += chunk ;
    })
    req.on('end' , ()=>{
        let deletedUser = JSON.parse(body) ;
        let index = users.findIndex((user)=> user.id == deletedUser.id) ;
        if (index !== -1) {
            users.splice(index , 1);
            res.send(JSON.stringify(users))
        }
    })
}).get('/search' , express.json() , (req , res)=>{
    let body = "" ;
    req.on("data" , (chunck)=>{
        body += chunck ;
    })
    req.on("end" , ()=>{
        let item = JSON.parse(body) ;
        if (item.name) {
            let searchresult = users.filter((user)=> user.name.toLowerCase().startsWith(item.name.toLowerCase()));
            res.json(searchresult);
        }
    })
})
.listen(3000 , ()=>console.log("the server start working"))