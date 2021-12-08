const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
  // keys must match column names in table
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list() {
  return knex("reviews").select("*");
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function readReviewCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .then((reviews) => reviews.map(addCritics));
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  readReviewCritic,
  update,
  delete: destroy,
};