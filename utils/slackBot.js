export const verify = async (req, res) => {
  const { challenge } = req.body;

  res.send({ challenge });
};
