import React, { useEffect, useState } from "react";
import "../Usuarios/Usuario.css";
import Modal from "./ModalAddUser";
import api from "../../Services/api";

function Usuario() {
  var defaultUsuario ={
    id : undefined,
    nome : "",
    cpf : "",
    dataNascimento : "",
    sexo : "N",
    cargo : "N",
    perfis : []
  };
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(defaultUsuario);

  useEffect(() => {
    loadUsuarios();
  }, []);

  function openModal() {
    setModalTitulo("Adicionar");
    setModalAction("add");
    setModalShow(true);
    setUsuario(defaultUsuario);
  }

  function openModalEdit(elemento){
    setModalTitulo("Editar");
    setModalAction("edit");
    setModalShow(true);
    setUsuario(elemento);
  }

  function handleclose() {
    setModalShow(false);
  }

  async function loadUsuarios() {
    const response = await api.get("usuario");
    setUsuarios(response.data);
  }

  return (
    <div className="container-fluid">
      <Modal
        titulo={modalTitulo}
        action={modalAction}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleclose={handleclose}
        onLoad={() => loadUsuarios()}
        usuario={usuario}
      />
      <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => openModal()}
        >
          Adicionar
        </button>
      </div>

      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-hover table-sm ">
          <caption>Lista de Usuários</caption>
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">NOME</th>
              <th scope="col">CPF</th>
              <th scope="col">DATA DE NASCIMENTO</th>
              <th scope="col">DATA DE CADASTRO</th>
              <th scope="col">SEXO</th>
              <th scope="col">CARGO</th>
              <th scope="col">PERFIS</th>
              <th scope="col">OPERAÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.id}</td>
                <td>{elemento.nome}</td>
                <td>{elemento.cpf}</td>
                <td>{elemento.dataNascimento}</td>
                <td>{elemento.dataCadastro}</td>
                <td>{elemento.sexo}</td>
                <td>{elemento.cargo.nome}</td>   
                <td>             
                {elemento.perfis.map((perfil, index)=>(
                  perfil.nome + ";"
                ))} 
                </td>               
                <td>
                  <button type="button" className="btn btn-primary btn-sm " onClick={()=>{openModalEdit(elemento)}}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuario;
