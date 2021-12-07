function addCritics(reviews) {
    return reviews.map((review) => {
      return {
        review_id: review.review_id,
        content: review.content,
        score: review.score,
        created_at: review.created_at,
        updated_at: review.updated_at,
        critic_id: review.critic_id,
        movie_id: review.movie_id,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.created_at,
          updated_at: review.updated_at,
        },
      };
    });
  }
  
  module.exports = addCritics