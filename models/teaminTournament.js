
//These are the values of the Team active in the tornament it is being joined to the tournament table with the commented scrip at the top of file AllTourni.js

module.exports = (sequelize, DataTypes) => {
  const teamintournament = sequelize.define(`teamintournament`, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tournamentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TeamName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Wins: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    losses: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    totalpoints: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  //start trying as a has one update to has many if this works
  teamintournament.associate = models => {
    teamintournament.hasOne(models.alltourni, {
      onDelete: 'cascade'
    });
  };

  return teamintournament;
};
