
const manageError = (error, req, res, next) => {
    res.status(error.httpStatus || 500).send({ error: error.message });
  };
  
  export default manageError;
  