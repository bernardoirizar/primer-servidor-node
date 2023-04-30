const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')


const storageStrategy = multer.memoryStorage()
const upload = multer({storage:multer.memoryStorage()  })

const app = express()

app.use(express.json())

app.get('/', function (req, res) {
    res.send("Hola mundo")
}
)

app.post('/imagen', upload.single('imagen') , async function (req,res) {

    const imagen = req.file
    
    const processedImage = sharp(imagen.buffer)
    
    const rezizedImage = processedImage.resize(400,400, {
        fit:'contain',background: '#FFF'    })

    const rezizedImageBuffer = await rezizedImage.toBuffer()
    
    fs.writeFileSync ('nuevaruta/prueba.png', rezizedImageBuffer)

    console.log(rezizedImageBuffer)

    res.send({rezizedImage: rezizedImageBuffer}) 
})

const PORT = process.env.PORT || 3000

app.listen(PORT, function(){

        console.log("Servidor ecuchando en el puerto", PORT)

})