var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Item.findAll({ include: [db.User] }).then(function (data) {
      res.render("index", {
        items: data
      });
    });
  });

  app.get("/signup", function (req, res) {
    res.render("register");

  });

  app.get("/login", function (req, res) {
    // res.sendfile("public/html/login.html");
    res.render("login");
  });

  // Load singleitem page and pass in an item by id
  app.get("/items/:id", function (req, res) {
    db.Item.findOne({ include: [db.User], where: { id: req.params.id } }).then(function (data) {
      res.render("singleItem", data.dataValues);
      console.log(data.dataValues);
    });
  });

  app.get("/users/:UserId", function (req, res) {
    db.Item.findAll({ include: [db.User], where: req.params }).then(data => res.render("account", { items: data })).catch(err => res.json(err));
  });

  app.get("/newitem/:UserId", function (req, res) {
    res.render("postItem", req.params);
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
