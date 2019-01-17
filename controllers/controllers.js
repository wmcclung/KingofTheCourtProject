const express = require("express");
const router = express.Router();

router.index = (req, res) => {
  res.render("index");
};

router.about = (req, res) => {
  res.render("about");
};

router.contact = (req, res) => {
  res.render("contact");
};

router.tourni = (req, res) => {
  res.render("tourni");
};

router.playerhome2 = (req, res) => {
  res.render("playerhome2");
};



module.exports = router;
