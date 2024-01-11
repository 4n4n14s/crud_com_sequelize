const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('nodesequelize', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql"
})

/*try {
    sequelize.authenticate()
    console.log('conectamos com sucesso ao sequelise')
    
} catch (err) {
    console.log(`não foi possivel conectar: ${err}`)
    
}
*/
module.exports = sequelize