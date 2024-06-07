import express from "express"
import bodyParser from "body-parser";
import usuario from "./src/routers/usuario.routes.js"
import cors from 'cors';

const app = express();
const port= 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set('views engine','ejs')
app.set('views','./views')
app.use(express.static('./public'))
app.use(cors())

app.get('/document',(req, res)=>{
    res.render('document.ejs')
})

app.use(express.static('/public'))

app.use(usuario)

app.listen(port,()=>{
    console.log(`servidor corriendo excelentemente ${port} ✈🪂☠`)
})