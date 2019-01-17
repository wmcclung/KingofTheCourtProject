//Model for Users table

//require bcrypt for password hashing in the database, essentially it encrypts the user's password before storing it to the database
const bcrypt = require(`bcrypt-nodejs`);
/**
 * Users
 * uuid (uniquie identifier and primary key)
 * account type (player or sponsor)
 * first name
 * last name
 * company name (if sponsor account)
 * email
 * password
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(`User`, {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },

    accountType: {
      type: DataTypes.ENUM('player', 'sponsor'),
      allowNull: false,
      defaultValue: 'player'
    },


    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },

    companyName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/
      }
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.isSponsor = function () {
    return this.accountType === 'sponsor';
  };

  User.prototype.isPlayer = function () {
    return this.accountType === 'player';
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook(`beforeCreate`, user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  // Hook to hash password if user changes password
  User.addHook('beforeUpdate', user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );

    User.associate = models => {
      User.hasOne(models.UserProfile, {
        onDelete: 'cascade'
      });
    };
  });

  return User;

};
