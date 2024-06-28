import serv from "../../services/homePageServ/index.js";

const getProjectHand = async (req, res) => {
  const response = await serv.getHome();
  res.status(200).json(response);
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  const response = await serv.getById(id);
  res.status(200).json(response);
};

const getItemById = async (req, res) => {
  const {id}= req.params; 
  const response = await serv.getDetail(id);
  res.status(200).json(response);
}
export { 
  getProjectHand, 
  getProjectById, 
  getItemById,
};
