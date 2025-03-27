// controllers/chatbotController.js

const chatbotResponse = (query) => {
  const responses = {
    "What is the portal about?": "This portal helps you find jobs and apply to companies that fit your skills.",
    "How can I apply for a job?": "To apply for a job, you need to create an account and then create your profile upload resume and then apply the job.",
    "Can I receive notifications for new jobs?": "Yes, you can receive notifications via email when a new job is posted.",
    "How do I search for jobs?": "You can search for jobs by entering keywords in the search bar or filter by location, job type, and more.",
    "How do I update my resume?": "Go to your profile and you will be able to see a Edit icon click on it, upload a new resume under the 'Resume' section.",
    "How can I check the status of my application?": "You can check the status of your application by going to the 'Applications' section in your profile.",
    "What types of jobs are listed?": "We have a wide variety of jobs including full-time, part-time, remote, and freelance positions.",
    "How do I update my profile?": "Go to your profile and Go to your profile and you will be able to see a Edit icon click on it and you can update your Profile"
  };

  // A fallback for more flexible responses
  const fallbackResponse = `Sorry, I couldn't find an exact match for your query. Here's what I know: 
    - You can ask about job application processes, company profile creation, job search, notifications, and more.`;

  // Try to match exact queries first, then fallback to general response
  if (responses[query]) {
    return responses[query];
  } else {
    // Check if the query contains certain keywords and return related responses
    const keywords = {
      "job": "It seems like you're asking about jobs. Try asking how to search for jobs or how to apply.",
      "resume": "Are you asking about updating your resume? Go to your profile and upload a new one.",
      "application": "To check the status of your application, head over to the 'Applications' section in your profile.",
      "notifications": "Yes, you can set up notifications to receive job updates via email .",
      "contact": "You can contact support through the 'Contact Us' page on the portal.",
      "status":"You can check the application status in the view profile page ",
      "update":"Are you asking about updating your Profile/Resume?Try asking how do I update my profile? or how do I update my resume?  "
    };

    // Check if the query contains a keyword
    for (const keyword in keywords) {
      if (query.toLowerCase().includes(keyword)) {
        return keywords[keyword];
      }
    }

    // Return the fallback response if no match is found
    return fallbackResponse;
  }
};

export const getChatbotResponse = (req, res) => {
  const { query } = req.body;
  const response = chatbotResponse(query);
  res.json({ response });
};

export default getChatbotResponse;
