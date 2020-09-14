const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

//const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (_, response) => {
  
  response.status(200).json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);

  return response.status(201).json(repo)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0) {
    response.status(400).json({error: 'Repository not found'});
  }

  const repo = {
    ...repositories[repoIndex],
    title,
    url,
    techs
  }

  repositories[repoIndex] = repo;


  response.send(repo);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  const repo = {
    ...repositories[repoIndex],
    likes: repositories[repoIndex].likes + 1
  }

  repositories[repoIndex] = repo;

  return response.status(201).json(repo)


});

module.exports = app;
