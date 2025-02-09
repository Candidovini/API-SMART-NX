import CustomError from "./CustomError";

const ErroHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    res.status(err.code).send({ message: err.message });
  } else if (err instanceof Error) {
    res.status(500).send({ message: err.message });
  }
};

export default ErroHandler;
