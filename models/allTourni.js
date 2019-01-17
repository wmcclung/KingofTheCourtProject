module.exports = (sequelize, DataTypes) => {
  const alltourni = sequelize.define(`alltourni`, {





    

    //tried associating with teaminTournament here but it crashes on local
    // associate: (models) => {
    //   console.log(models);
    //   // tournament will have multiple teams

    //   allTourni.hasmany(models.teamInTournament, {
    //     foreignKey: 'tournamentId',

    //   });
    // },
    
    //values of the tournament table
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    tournamentName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    numberOfTeams: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    Sponsor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    }
  });

    //trying the belongs to here like our user table
  alltourni.associate = models => {
    alltourni.belongsTo(models.teamintournament, {
      foreignKey: {
        

        allowNull: false
      }
    });
  };


  return alltourni;
};



