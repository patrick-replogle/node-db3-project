const db = require("../data/db-config");

function find() {
  return db("schemes").select();
}

function findById(id) {}

function findSteps(id) {}

function add() {}

function update(id, change) {}

function remove(id) {}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
