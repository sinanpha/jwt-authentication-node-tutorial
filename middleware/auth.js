const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1] // && : nếu có authHeader thì làm về sau 
	//Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5.....
	// split để tách bearen và khúc sau, [1] để lấy token khúc sau

	if (!token) return res.sendStatus(401)

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		console.log('decoded', decoded)
		req.userId = decoded.id
		next() // next co nghia xac thuc xong co the di tiep
	} catch (error) {
		console.log(error)
		return res.sendStatus(403)
	}
}

module.exports = verifyToken
