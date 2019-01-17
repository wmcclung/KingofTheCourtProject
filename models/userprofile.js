module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2]
      }
    },

    favoriteSport: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },

    favoriteTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    facebookURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: true
      }
    }
  });

  UserProfile.associate = models => {
    UserProfile.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserProfile;
};