const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const mime = require("mime")


const app = http.createServer()

app.on("request",(req,res)=>{
    let pathname = url.parse(req.url).pathname
    pathname = pathname == '/' ? '/index.html' : pathname
    let realPath = path.join(__dirname,"public",pathname)
    console.log(realPath);
    let type = mime.getType(realPath)
    fs.readFile(realPath,(err,data)=>{
        if(!err){
            res.writeHead(200,{'content-type':type})
            res.end(data)
            return
        }else{
            res.writeHead(404,{
                'content-type':'text/html;charset=utf-8'
            })
            res.end(`${realPath},文件读取失败`)
            return
        }
    })
})

app.listen(3000)
console.log("服务启动成功")