const FormatedResponse = {
  true: (message, data) => {
    return {
      success: true,
      message: message || "Operation was successful.",
      data: data || [],
      date: new Date().toISOString(),
    };
  },

  false: (errorMessage) => {
    return {
      success: false,
      error: errorMessage || "An error occurred.",
      date: new Date().toISOString(),
    };
  },
};

module.exports = { FormatedResponse };
