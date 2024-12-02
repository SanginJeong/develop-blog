const Portfolio = require('../model/Portfolio');

const portfolioController = {};

portfolioController.appendPortfolio = async (req,res) => {
  try {
    const {title, webURL, gitURL} = req.body;
    console.log(title,webURL,gitURL);
    
    if(!title) {
      throw new Error("제목을 입력하세요.");
    }
    if(!webURL || !gitURL) {
      throw new Error("주소를 입력하세요.");
    }

    const newPortfolio = new Portfolio({title,webURL,gitURL});
    await newPortfolio.save();

    res.status(200).json({status:"Ok", newPortfolio});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

portfolioController.getPortfolio = async (req,res) => {
  try {
    const portfolioList = await Portfolio.find({});
    if(!portfolioList){
      res.status(200).json({status:"Ok", message: "포트폴리오를 등록하세요."})
    }
    res.status(200).json({status:"Ok", portfolioList});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

portfolioController.deletePortfolio = async (req,res) => {
  try {
    const { portfolioId } = req.params;
    if(!portfolioId) {
      throw new Error("해당 포트폴리오를 찾을 수 없습니다.");
    }
    const deletedPortfolio = await Portfolio.deleteOne({_id: portfolioId});
    res.status(200).json({status:"Ok", deletedPortfolio});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.essage});
  }
}

portfolioController.updatePortfolio = async (req,res) => {
  try {
    const {portfolioId} = req.params;
    const {title,webURL,gitURL} = req.body;
    if(!portfolioId){
      throw new Error("해당 포트폴리오를 찾을 수 없습니다.");
    }
    if(!title){
      throw new Error("제목을 입력하세요.");
    }
    if(!webURL || !gitURL){
      throw new Error("주소를 입력하세요");
    }

    const updatedPortfolio = await Portfolio.updateOne({_id: portfolioId},{title,webURL,gitURL});
    res.status(200).json({status:"Ok", updatedPortfolio});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

module.exports = portfolioController;