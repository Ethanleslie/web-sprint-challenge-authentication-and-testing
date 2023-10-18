const User = require('../../users/users-model')


async function checkIfUsernameFree(req, res, next) {
    
    try{
        const [user] = await User.find({ username: req.body.username})
        console.log('user', user)
        console.log('username', user.username)
        console.log('req', req.body.username)
        if(req.body.username === user.username) {
            console.log('else')
        next({status: 401, message: "username taken"})
        }
        else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}


async function checkUsernameExists(req, res, next) {
    try{
        const users = await User.find({ username: req.body.username})
        if(users.length) {
            next()
        }
        else{
            next({ message: "invalid credentials", status: 401})
        }
    } catch( err) {
        next(err)
    }
}


module.exports = {
    checkIfUsernameFree,
    checkUsernameExists
}

