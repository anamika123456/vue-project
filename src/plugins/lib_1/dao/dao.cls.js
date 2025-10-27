import mysql from 'mysql'

export class DAO {

  // connection to mysql blockmaze-business
  mysqlConnection = null

  /**
   * Constructor detail
   * save config and open connection
   * @param {*} databaseConfiguration 
   */
  constructor(databaseConfiguration) {
    this.databaseConfiguration = databaseConfiguration
    this.initConnection()
  } 

  /** 
   * init databse connection to mysql 
   * with settings from config 
   */
  initConnection() {
    this.mysqlConnection = 
      mysql.createConnection(this.databaseConfiguration)
    this.mysqlConnection.connect((err) => {
      if (err) throw err
      console.log('\n\t---> DAO connected to mysql db:\n\n', 
      this.databaseConfiguration, '\n')
      this.mysqlConnection.query('SET NAMES `utf8mb4`')	
    })
  }

  /**
   * re-format array to object where id becomes key.
   * @param {array} list 
   * @param {*} idName name of id-field
   */
  idsForKeys(list, idName) {
    idName = (typeof idName === 'undefined') ? 'id' : idName
    const res = {}
    list.map(r => {
      res[r[idName]] = r
    })
    return res
  }

}

