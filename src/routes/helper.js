const UserAlreadyExists = (error) => {
  error;
  if (error.code === 11000) {
    let problem = Object.keys(error.keyValue);

    return {
      info: `${problem} já existe, tente novamente.`,
      element: problem[0],
      error: true,
      code: 11000,
    };
  }
};

module.exports = { UserAlreadyExists };
