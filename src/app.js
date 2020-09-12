//const path=require('path')
/*const express=require('express')
const { title } = require('process')
console.log(__dirname)

const app=express()
console.log(path.join(__dirname, '../public'))
const publicDirectorypath=path.join(__dirname, '../public')
//app.use(express.static(publicDirectorypath))

app.use(express.static(publicDirectorypath))
app.set('views engine','hbs')
app.get('',(req,res)=>{
    res.render('index')
        
})

app.get('/weather',(req,res)=>{
    res.send({
        forecast:'it is rainy',
        location:'mumbai'
    })
})
app.listen(3000, ()=>{
console.log('the server run on port 3000')
})*/
const path = require('path')
const express = require('express')
const hbs=require('hbs')
const port=process.env.PORT ||3000
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath=path.join(__dirname,'../templates/views')
const pathpartials=path.join(__dirname,'../templates/partials')
//setup handle bars express and location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(pathpartials)
//setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'jamila'
    })
})

app.get('/about', (req, res) => {
        res.render('about', {
        title: 'About Me',
        name: 'Jamila siddiqui'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'help',
        name:'jamila siddiqui'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search'
        })
    }
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404', {
        name: 'This is some helpful text.',
        title:'404',
        errorMessage:'help not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404', {
        name: 'This is some helpful text.',
        title:'404',
        errorMessage:'404 not fount'
    })

})

app.listen(port, () => {
    console.log('Server is up on port 3000.'+port)
})