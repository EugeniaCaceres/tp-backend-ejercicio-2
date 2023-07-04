import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import "./ListaTarea.css";

function ListaTarea() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [updateTarea, setUpdateTarea] = useState("");
  const [tareaId, setTareaId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/tareas/")
      .then((response) => {
        setTareas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/tareas/${id}`)
      .then(() => {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/tareas/${tareaId}`, {
        id: tareaId,
        tarea: updateTarea,
      })
      .then((response) => {
        setTareas(
          tareas.map((tarea) =>
            tarea.id === tareaId ? { ...tarea, tarea: updateTarea } : tarea
          )
        );
        setUpdateTarea("");
        setTareaId("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:3000/tareas/", {
        id: Math.floor(Math.random() * 1000),
        tarea: nuevaTarea,
      })
      .then((response) => {
        setTareas([...tareas, response.data]);
        setNuevaTarea("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <h1>Lista de Tareas</h1>
      <ListGroup>
        {tareas.map((tarea) => (
          <ListGroup.Item key={tarea.id}>
            {tarea.tarea}
            <Button variant="danger" onClick={() => handleDelete(tarea.id)}>
              Borrar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Row>
        <Col>
          <Form.Control
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={handleAdd}>Agregar</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Control
            type="text"
            value={tareaId}
            placeholder="ID de tarea a modificar"
            onChange={(e) => setTareaId(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={updateTarea}
            placeholder="Nuevo valor de tarea"
            onChange={(e) => setUpdateTarea(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={handleUpdate}>Modificar</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ListaTarea;
