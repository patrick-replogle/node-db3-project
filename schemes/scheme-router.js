const express = require("express");
const db = require("../data/db-config");

const Schemes = require("./scheme-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.json(schemes);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

router.get("/:id/steps", (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res
          .status(404)
          .json({ message: "Could not find steps for given scheme" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get steps" });
    });
});

router.post("/", (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
    .then(scheme => {
      res.status(201).json(scheme);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new scheme" });
    });
});

router.get("/steps/:id", (req, res) => {
  Schemes.findStepById(req.params.id)
    .then(step => {
      if (step) {
        res.json(step);
      } else {
        res.status(404).json({
          message: "Step id not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not retrieve step"
      });
    });
});

router.post("/:id/steps", async (req, res) => {
  try {
    const stepNumber = await Schemes.findSteps(req.params.id).then(steps => {
      return steps.length + 1;
    });

    const stepData = {
      instructions: req.body.instructions,
      scheme_id: req.params.id,
      step_number: stepNumber
    };
    const { id } = req.params;

    const step = await Schemes.findById(id);
    if (step) {
      res.status(201).json(await Schemes.addStep(stepData));
    } else {
      res.status(404).json({ message: "Scheme not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create new step" });
  }
});

// router.post("/:id/steps", (req, res) => {
//   const stepNumber = Schemes.findSteps(req.params.id).then(steps => {
//     return steps.length + 1;
//   });

//   const stepData = {
//     instructions: req.body.instructions,
//     scheme_id: req.params.id,
//     step_number: stepNumber
//   };
//   const { id } = req.params;

//   Schemes.findById(id)
//     .then(scheme => {
//       if (scheme) {
//         Schemes.addStep(stepData).then(step => {
//           res.status(201).json(step);
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "Could not find scheme with given id." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to create new step" });
//     });
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.update(changes, id).then(updatedScheme => {
          res.json(updatedScheme);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update scheme" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});

module.exports = router;
