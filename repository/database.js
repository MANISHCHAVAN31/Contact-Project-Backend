const Pool = require("pg").Pool;
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const pool = new Pool({
  user: "postgres",
  password: "123456",
  database: "contactproject",
  host: "127.0.0.1",
  post: "5432",
});

const seq = new Sequelize("contactproject", "postgres", "123456", {
  dialect: "postgres",
  host: pool.host,
});

const connectDatabase = async () => {
  try {
    await seq.authenticate();
    console.log("CONNECTION HAS BEEN ESTABLISHED SUCCESSFULLY");
  } catch (error) {
    console.log("UNABLE TO CONNECT DATABASE: ", error);
  }
};
connectDatabase();

// definations
const User = seq.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  },
  {
    paranoid: true,
  }
);

const Credential = seq.define("credentials", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  userid: {
    type: Sequelize.UUID,
  },
});

const Contact = seq.define(
  "contacts",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.UUID,
    },
  },
  {
    paranoid: true,
  }
);

const ContactDetail = seq.define(
  "contactdetails",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
  },
  {
    paranoid: true,
  }
);

// relations

User.hasOne(Credential, {
  foreignKey: "userid",
});

User.hasMany(Contact, {
  foreignKey: "userid",
});

Contact.belongsTo(User, {
  foreignKey: "userid",
});

Contact.hasMany(ContactDetail, {
  foreignKey: "contactid",
});

ContactDetail.belongsTo(Contact, {
  foreignKey: "contactid",
});

class MyDatabase {
  constructor() {
    this.pool = pool;
  }

  // user actions
  async createUser(user) {
    try {
      const encPassword = await bcrypt.hash(user.credentials.password, 10);
      const newUser = await User.create({
        id: user.id,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
      });

      const credential = await Credential.create({
        id: user.credentials.id,
        username: user.credentials.username,
        password: encPassword,
        userid: user.id,
      });

      return [newUser, credential];
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(userid, parameter, value) {
    try {
      switch (parameter) {
        case "firstname":
          return await User.update(
            {
              firstname: value,
            },
            {
              where: {
                id: userid,
              },
            }
          );
          break;

        case "lastname":
          return await User.update(
            {
              lastname: value,
            },
            {
              where: {
                id: userid,
              },
            }
          );
          break;

        case "role":
          return await User.update(
            {
              role: value,
            },
            {
              where: {
                id: userid,
              },
            }
          );
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(username) {
    try {
      const credential = await Credential.findOne({
        where: { username: username },
      });

      return await User.destroy({
        where: {
          id: credential.userid,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(username) {
    try {
      const user = await User.findOne({
        include: {
          model: Credential,
          where: { username: username },
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      return await User.findAll({
        where: { role: { [Op.ne]: "admin" } },
        include: { model: Credential },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async retreiveUser(username) {
    try {
      const user = await User.restore({
        include: {
          model: Credential,
          where: {
            username: username,
          },
        },
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsersIncludingdDeleted() {
    try {
      const allusers = await User.findAll({
        paranoid: false,
        where: { role: { [Op.ne]: "admin" } },
        include: {
          model: Credential,
        },
      });

      return allusers;
    } catch (error) {
      console.log(error);
    }
  }

  // contacts

  async createContact(user, contact) {
    try {
      return await Contact.create({
        id: contact.id,
        firstname: contact.firstName,
        lastname: contact.lastName,
        userid: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getContact(contactId) {
    try {
      const contact = await Contact.findOne({
        where: {
          id: contactId,
        },
      });
      return contact;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllContacts(userId) {
    try {
      return await Contact.findAll({
        where: {
          userid: userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateContact(contactId, parameter, value) {
    try {
      switch (parameter) {
        case "firstname":
          return await Contact.update(
            {
              firstname: value,
            },
            {
              where: {
                id: contactId,
              },
            }
          );
          break;

        case "lastname":
          return await Contact.update(
            {
              lastname: value,
            },
            {
              where: {
                id: contactId,
              },
            }
          );
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteContact(contactId) {
    try {
      return await Contact.destroy({
        where: {
          id: contactId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async retreiveContact(contactId) {
    try {
      return await Contact.restore({
        where: {
          id: contactId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getContacts(user) {
    try {
      return await Contact.findAll({
        where: {
          userid: user.id,
        },
        include: {
          model: ContactDetail,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllContactsIncludingdDeleted(user) {
    try {
      console.log(user.id);
      return await Contact.findAll({
        where: {
          userid: user.id,
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // contact detail

  async createContactDetail(contactId, contactDetail) {
    try {
      return await ContactDetail.create({
        id: contactDetail.id,
        type: contactDetail.type,
        number: contactDetail.number,
        contactid: contactId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateContactDetail(contactDetailId, parameter, value) {
    try {
      switch (parameter) {
        case "type":
          return await ContactDetail.update(
            {
              type: value,
            },
            {
              where: {
                id: contactDetailId,
              },
            }
          );
          break;

        case "number":
          return await ContactDetail.update(
            {
              number: value,
            },
            {
              where: {
                id: contactDetailId,
              },
            }
          );
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteContactDetail(contactDetailId) {
    try {
      return await ContactDetail.destroy({
        where: {
          id: contactDetailId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async retreiveContactDetail(contactDetailId) {
    try {
      return await ContactDetail.restore({
        where: {
          id: contactDetailId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getContactDetails(contactId) {
    try {
      return await ContactDetail.findAll({
        where: {
          contactid: contactId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getContactDetailsIncludingDeleted(user) {
    try {
      return await ContactDetail.findAll({
        include: {
          model: Contact,
          where: {
            userid: user.id,
          },
        },
        paranoid: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MyDatabase;
