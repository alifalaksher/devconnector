const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const { model } = require("mongoose");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwt"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not Valid" });
  }
};
