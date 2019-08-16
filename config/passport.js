// config/passport.js

// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

// load up the user model
var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");
var env = "development";
var dbconfig = require(__dirname + "/../config/config.json")[env];
var connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.username,
  password: dbconfig.password,
  database: dbconfig.database
});
connection.query("USE " + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM Users WHERE id = ? ", [id], function(
      err,
      rows
    ) {
      done(err, rows[0]);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        connection.query(
          "SELECT * FROM Users WHERE username = ?",
          [username],
          function(err, rows) {
            if (err) {
              return done(err);
            }
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That username is already taken.")
              );
            } else {
              var newUserMysql = {
                username: username,
                password: bcrypt.hashSync(password, null, null)
              };

              var insertQuery =
                "INSERT INTO Users ( username, password ) values (?,?)";
              connection.query(
                insertQuery,
                [newUserMysql.username, newUserMysql.password],
                function(err, rows) {
                  newUserMysql.id = rows.insertId;

                  return done(null, newUserMysql);
                }
              );
            }
          }
        );
      }
    )
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called "local"

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "user",
        passwordField: "pass",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        // callback with email and password from our form
        connection.query(
          "SELECT * FROM Users WHERE username = ?",
          [username],
          function(err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found."));
            }

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password)) 
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);
          });
      })
    );
};
