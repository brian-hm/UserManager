import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../Services/api";

function ModalAddCargo(props){
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearInput() {
    setNome("");
  }

  useEffect(() => {
    setNome(props.cargo.nome);
  }, [props]);

  async function save() {
    if (   
      nome.length === 0 
    ) {
      setErro(true);
      const timer = setTimeout(() => {
        setErro(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
    
      
      const cargo = {
        nome: nome,
      };
      if (props.action === "add") {
        try {
          await api.post("cargo", JSON.stringify(cargo), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          setErro(true);
          const timer = setTimeout(() => {
            setErro(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => {
          setSuccess(false);
          clearInput();
          props.onLoad();
          props.onHide();
        }, 2000);

        return () => clearTimeout(timer);
      }
      if (props.action === "edit") {
        try {
          await api.put("cargo/" + props.cargo.id, JSON.stringify(cargo), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          setErro(true);
          const timer = setTimeout(() => {
            setErro(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => {
          setSuccess(false);
          clearInput();
          props.onLoad();
          props.onHide();
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <form>
          {success ? (
            <div className="alert alert-success" role="alert">
              Salvo com sucesso!
            </div>
          ) : (
            ""
          )}
          {erro ? (
            <div className="alert alert-danger" role="alert">
              Não foi possível salvar! Verifique se todos os campos são válidos.
            </div>
          ) : (
            ""
          )}
          <div className="container form-group">
            <div className="row">
              <div className="col-sm">
                <label className="col-form-label">Nome</label>
                <input
                  type="text"
                  value={nome}
                  className="form-control"
                  onChange={(e) => setNome(e.target.value)}
                  id="recipient-name"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleclose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={save}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddCargo;