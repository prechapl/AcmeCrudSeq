const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
    name: Sequelize.STRING
});

const syncAndSeed = () => {
  return conn.sync({ force: true})
    // .then( async () => {

    //   await Promise.all([
    //     User.create({ name: 'Wagz'}),
    //     User.create({ name: 'Ryder'}),
    //     User.create({ name: 'Ziggy'})
    //   ])
    // })
};

module.exports = { User, syncAndSeed }

