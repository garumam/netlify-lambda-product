module.exports = class DBAbstract {
  constructor() {
    if (new.target === DBAbstract) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    if (this.connection === undefined) {
      throw new TypeError("Must override method");
    }
  }
}