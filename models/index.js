`use strict`;

const fs = require(`fs`);
const path = require(`path`);
const Sequelize = require(`sequelize`);
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || `development`;
const config = require(__dirname + `/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], { dialect: config.dialect });
} else {
  sequelize = new Sequelize(config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(`.`) !== 0 && file !== basename && file.slice(-3) === `.js`
    );
  })
  .forEach(file => {

    //line was originally const model = sequelize.import(path.join(__dirname, file)); before I changed it. ==== I changed it back my change didnt influence it. 
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;




//trying to join tables on the index instead of the table file in different ways - didnt work

// teaminTournament.belongsTo(allTourni);

// allTourni.hasmany(models.teamInTournament, {
//   foreignKey: 'tournamentId',

// });



console.log(`DB`, Object.keys(db));
module.exports = db;
