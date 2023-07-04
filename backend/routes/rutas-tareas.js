var express = require("express");

const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  id: Number,
  tarea: String,
});

const Tarea = mongoose.model("Tarea", tareaSchema);



var router = express.Router();

let lista_tareas = [];

router.get("/", function (req, res) {
  res.send(lista_tareas);
});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  tarea = lista_tareas.filter(function (e) {
    return e.id == id;
  });

  res.send(tarea);
});

router.post("/", function (req, res) {
  let data = req.body;

  const tarea = new Tarea({ id: data.id, tarea: data.tarea });
  tarea.save();

  lista_tareas.push(data);
  res.send(data);
});

router.put("/:id", function (req, res) {
  let data = req.body;
  var id = req.params.id;

  tarea = lista_tareas.filter(function (e) {
    return e.id == id;
  });

  if (tarea.length > 0) {
    const indice = lista_tareas.findIndex(function (e) {
      return e.id == id;
    });

    lista_tareas[indice] = data;
    res.send(data);
  } else {
    res.status(404).send("Tarea no encontrada");
  }
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;

  lista_tareas = lista_tareas.filter(function (e) {
    return e.id != id;
  });

  res.send(lista_tareas);
});

module.exports = router;
