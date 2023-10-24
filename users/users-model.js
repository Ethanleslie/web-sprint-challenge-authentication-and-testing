const db = require('../data/dbConfig')


async function add(user) {
    console.log(user)
    const [id] = await db('users').insert(user)
    return findById(id)
}


function find() {
    return db('users').select('id' , 'username')
}

function findBy(filter) {
    return db('users').where(filter)
    }
    

function findById(id) {
    return db('users')
    .select('id', 'username', 'password')
    .where('id', id).first()
}


module.exports = {
    add,
    find,
    findById,
    findBy
}