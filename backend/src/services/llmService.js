const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const MODEL = 'llama-3.3-70b-versatile';

/**
 * Generate AI response for user based on their review
 */
async function generateUserResponse(rating, reviewText) {
  try {
    const prompt = `You are a friendly customer service assistant. A customer has left a ${rating}-star review with the following text:

"${reviewText}"

Generate a warm, empathetic response thanking them for their feedback. Keep it brief (2-3 sentences), professional, and appropriate for the rating given. For low ratings (1-2 stars), acknowledge their concerns and show we want to improve. For high ratings (4-5 stars), express genuine appreciation.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 200
    });

    return completion.choices[0]?.message?.content || 'Thank you for your feedback!';
  } catch (error) {
    console.error('Error generating user response:', error);
    return 'Thank you for your valuable feedback. We appreciate you taking the time to share your experience with us.';
  }
}

/**
 * Generate AI summary for admin dashboard
 */
async function generateAdminSummary(rating, reviewText) {
  try {
    const prompt = `Analyze this ${rating}-star review and provide a concise 1-2 sentence summary highlighting the key points:

"${reviewText}"

Focus on the main sentiment and any specific issues or praises mentioned.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.5,
      max_tokens: 150
    });

    return completion.choices[0]?.message?.content || `${rating}-star review summarized.`;
  } catch (error) {
    console.error('Error generating admin summary:', error);
    return `Customer provided a ${rating}-star rating. Review content requires manual review.`;
  }
}

/**
 * Generate recommended actions for admin
 */
async function generateRecommendedActions(rating, reviewText) {
  try {
    const prompt = `Based on this ${rating}-star review, suggest 2-3 specific, actionable steps the business should take. Be concise and practical.

Review: "${reviewText}"

Format your response as a JSON array of strings, like: ["Action 1", "Action 2", "Action 3"]

Only return the JSON array, nothing else.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
      temperature: 0.6,
      max_tokens: 300
    });

    const response = completion.choices[0]?.message?.content || '[]';
    
    // Try to parse JSON from response
    try {
      // Extract JSON array from response (handle cases where LLM adds text)
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const actions = JSON.parse(jsonMatch[0]);
        if (Array.isArray(actions) && actions.length > 0) {
          return actions.slice(0, 3); // Max 3 actions
        }
      }
    } catch (parseError) {
      console.error('Error parsing actions JSON:', parseError);
    }

    // Fallback actions based on rating
    if (rating <= 2) {
      return [
        'Reach out to customer within 24 hours to address concerns',
        'Investigate specific issues mentioned in the review',
        'Implement corrective measures to prevent similar issues'
      ];
    } else if (rating === 3) {
      return [
        'Follow up to understand areas for improvement',
        'Review operational processes mentioned in feedback',
        'Consider customer suggestions for service enhancement'
      ];
    } else {
      return [
        'Thank customer for positive feedback',
        'Share feedback with team for motivation',
        'Maintain consistent service quality standards'
      ];
    }
  } catch (error) {
    console.error('Error generating recommended actions:', error);
    return [
      'Review feedback carefully',
      'Take appropriate action based on rating',
      'Follow up if necessary'
    ];
  }
}

/**
 * Process review with all AI components
 */
async function processReview(rating, reviewText) {
  const startTime = Date.now();

  try {
    // Validate inputs
    if (!reviewText || reviewText.trim().length === 0) {
      throw new Error('Review text cannot be empty');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Generate all AI components in parallel for efficiency
    const [userResponse, adminSummary, recommendedActions] = await Promise.all([
      generateUserResponse(rating, reviewText),
      generateAdminSummary(rating, reviewText),
      generateRecommendedActions(rating, reviewText)
    ]);

    const processingTime = Date.now() - startTime;

    return {
      aiResponse: userResponse,
      aiSummary: adminSummary,
      recommendedActions,
      metadata: {
        processingTime,
        llmModel: MODEL
      }
    };
  } catch (error) {
    console.error('Error processing review:', error);
    throw new Error(`Failed to process review: ${error.message}`);
  }
}

module.exports = {
  processReview,
  generateUserResponse,
  generateAdminSummary,
  generateRecommendedActions
};