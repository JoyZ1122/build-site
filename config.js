
const dialect = 'mysql'
const dbName = 'landingpage'
const username = 'root'
const password = 'h.y.m.m.KXC@22'
const host = '39.98.241.29'
const port = '3306'

module.exports={
    "port": "4000",
    "db": {
      // "servername": "localhost",
      // "DATABASE": "admin",
      // "port": 27017,
      // "user": "",
      // "pass": "",
      // "authSource": "admin",
      dialect,
      dbName,
      username,
      password,
      host,
      port
    },
    "baseURL": process.env.VUE_APP_BASE_API
    // "baseURL": "http://localhost:4000"
  }