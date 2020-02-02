const db = require("../data/db-config");

function find() {
  return db("schemes").select();
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("schemes")
    .join("steps", "steps.scheme_id", "schemes.id")
    .where({ scheme_id: id })
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .orderBy("steps.step_number");
}

function findStepById(id) {
  return db("steps")
    .where({ id })
    .first();
}

async function addStep(stepData, id) {
  const [id] = await db("steps")
    .insert(stepData)
    .where("steps.scheme_id", id);

  return findStepById(id);
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

// first join attempt
// function findSteps(scheme_id) {
//   return db("steps")
//     .join("schemes", "schemes.id", "steps.scheme_id")
//     .where({ scheme_id })
//     .select(
//       "steps.id",
//       "schemes.scheme_name",
//       "steps.step_number",
//       "steps.instructions"
//     );
// }

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  findStepById,
  addStep
};
