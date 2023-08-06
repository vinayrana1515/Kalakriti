import jwt from 'jsonwebtoken'

const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'24hr'
    })
}

export default generateToken