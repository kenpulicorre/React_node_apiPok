//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//este es el index principal dinde see lllama la aplicacion
const server = require("./src/app.js"); //aplicaicon
const { conn } = require("./src/db.js"); //dabase

// Syncing all the models at once.c
//forma1--
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
//---fin forma 1
// // Syncing all the models at once.c
// //forma 2--
// server.listen(3001, () => {
//   console.log("%s listening at 3001"); // eslint-disable-line no-console
//   conn.sync({ force: true });
// });
// //---fin forma 2------------------------------
