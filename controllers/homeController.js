"use strict";

module.exports = {
  welcome: (req, res) => {
    res.render("index");
  },
	contact: (req, res) => {
		res.render("contact");
	},
  chat: (req, res) => {
    res.render("chat");
  }
};
