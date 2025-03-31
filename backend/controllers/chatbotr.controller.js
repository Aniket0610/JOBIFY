// controllers/chatbotController.js

const chatbotResponse = (query) => {
  const responses = {
    "How do I post a job?": "To post a job, you must have a company that is registered ,to post the job you should go to jobs page ,you will see a button new jobs enter the details and post the job ",
    "How do I review job applications?": "You can review applications by visiting jobs page where you will a Action column with ... dots where you will see a Applicants options by clicking on it you will able to see applicants and their detail and review it",
    "Can I contact job applicants?": "Yes, you can contact applicants via email and contact number given in the Resume",
    "How do I edit a job posting?": "Go to the 'My Jobs' section, find the job you want to edit, and click on 'Edit'.",
    "Can I delete a job posting?": "Yes, go to 'My Jobs', find the job posting, and select 'Delete'.",
    "How do I Accept/Reject candidates?": "You can shortlist candidates in the 'Applicants' section by clicking on Accept/Reject.",
    "How do I edit a Company Details?": "Go to the 'Company' page, find the company you want to edit, and click on 'Edit'.",
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
      "job": "It seems like you're asking about jobs. Try asking how do I post a job.",
      "resume": "Are you asking about how to view applicants resume? Go to your jobs page and see the applicants of the job you want you will be able to see the resume of the applicants",
      "application": "To update the status of application, Go to your jobs page and see the applicants of the job you want you will be able to see action button which will have options Accept/Reject",
    
      "status":"You can check the application status Go to your jobs page and see the applicants of the job you want you will be able to see action taken button which will show the application status",
      "company":"Are you asking about creating/registering your Company?To create new Company you need to go to companies page and you will see a New Company button ,enter the details there and register the new Company  "
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
