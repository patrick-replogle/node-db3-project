const db = require("../data/db-config");

function find() {
  return db("schemes").select();
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(scheme_id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .where({ scheme_id })
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    );
}

async function add(data) {
  const [id] = await db("schemes").insert(data);
  return db("schemes")
    .where({ id })
    .first();
}

async function update(changes, id) {
  await db("schemes")
    .where({ id })
    .update(changes);

  return findById(id);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
