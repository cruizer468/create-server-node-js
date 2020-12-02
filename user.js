class User {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    Title() {
     console.log(`my Name is ${this.name} and iam ${this.age} `)
    }

}

module.exports = User;

