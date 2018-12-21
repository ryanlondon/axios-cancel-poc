const express = require('express')
const app = express()

app.use(express.static('./'))

app.get('/slow', (req, res) => {
	setTimeout(() => {
		res.json(`Here's the slow data...`)
	}, 1500)
})

app.get('/fast', (req, res) => {
	res.json(`Here's the fast data!!!`)
})

app.listen(4000, () => console.log('Server is listening...'))
