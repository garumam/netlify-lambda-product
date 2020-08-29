// import Sequelize from 'sequelize';

// import User from '../app/models/User';
// import Ddd from '../app/models/Ddd';
// import Call from '../app/models/Call';
// import Plan from '../app/models/Plan';

// import databaseConfig from '../config/database';

// const models = [User, Ddd, Call, Plan];

// class Database {
//   constructor() {
//     this.init();
//   }

//   init() {
//     this.connection = new Sequelize(databaseConfig);

//     models
//       .map((model) => model.init(this.connection))
//       .map(
//         (model) => model.associate && model.associate(this.connection.models)
//       );
//   }
// }

// export default Database();