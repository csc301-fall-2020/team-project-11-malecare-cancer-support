const data = require("../../../contexts/preloads.json");

var cancers = [];
var treatmenets = data.treatment_types;
var medications = [];
var genderOptions = data.genders;
var sexualOrientationOptions = data.sexual_orientations;
var purposeOptions = ["male", "female", "other", "prefer not to respond"];

function parseCancerFromJson() {
  for (const [key, value] of Object.entries(data.cancer_types)) {
    cancers = [...cancers, ...value];
  }
}

function parseMedicationrFromJson() {
  for (const [key, value] of Object.entries(data.medications)) {
    medications = [...medications, ...value];
  }
}

parseCancerFromJson();
parseMedicationrFromJson();

export {
  cancers,
  medications,
  treatmenets,
  genderOptions,
  sexualOrientationOptions,
  purposeOptions,
};
