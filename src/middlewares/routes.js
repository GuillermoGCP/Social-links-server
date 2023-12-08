
const notFound = (req, res) => {
    res.status(404).send({ error: "Not found" });
  };
  
  export default notFound;
  