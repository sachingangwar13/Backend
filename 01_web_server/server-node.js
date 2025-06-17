const http = require('http')

const hostname = '127.0.0.1';
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type' , 'text/plain')
        res.end("Hello from Sachin!")
    }else if(req.url === '/login'){
        req.statusCode = 200
        res.setHeader('Content-Type' , 'text/plain')
        res.end("Login in hogya")
    }else{
        req.statusCode = 404
        res.setHeader('Content-Type' , 'text/plain')
        res.end(" 404 nhi mil rha")
    }
})

server.listen(port , hostname , ()=> {
    console.log(`Server is running at http://${hostname}:${port}`)
})