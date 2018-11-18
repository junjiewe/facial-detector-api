const handleReg = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(404).json("Incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    //more than two things at once
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => {
            res.status(400).json("unable to register");
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  handleReg: handleReg
};
