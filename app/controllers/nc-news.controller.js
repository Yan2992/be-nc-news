const endpoints = require("../../endpoints.json")
const { selectTopics } = require("../models/nc-news.model")


const getApi = (req, res) => {
    res.status(200).send({ endpoints }) 
}

const getTopics = (req, res) => {
    selectTopics().then((result) => {
        res.status(200).send({ topics: result });
      })
      .catch((err) => {
      })
}



module.exports = { getApi, getTopics };