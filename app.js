
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const nunjucks = require('nunjucks');


const app = express();
const PORT_NUMBER = 3777;


app.set('views', path.join(__dirname, 'views'));

function configureNunjucks() {
	const env = nunjucks.configure(app.get('views'), {
  	autoescape: true,
  	noCache: true,
  	watch: true,
  	express: app
	})	
}
configureNunjucks();

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', {
    message: "It's working!"
  })
})


app.listen(PORT_NUMBER, function () {
	console.log("the site is live on localhost");
})