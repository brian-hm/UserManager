import React, { useEffect, useState } from "react";
import Modal from '../Perfis/ModalAddPerfil';
import api from "../../Services/api";


function Perfil(){
    var defaultPerfil ={
        id : undefined,
        nome : "",
      };
      const [modalTitulo, setModalTitulo] = useState("");
      const [modalShow, setModalShow] = useState(false);
      const [modalAction, setModalAction] = useState("");
      const [perfis, setPerfis] = useState([]);
      const [perfil, setPerfil] = useState(defaultPerfil);
      const [erro, setErro] = useState(false);
      const [success, setSuccess] = useState(false);
    
      useEffect(() => {
        loadPerfis();
      }, []);
    
      function openModal() {
        setModalTitulo("Adicionar");
        setModalAction("add");
        setModalShow(true);
        setPerfil(defaultPerfil);
      }
    
      function openModalEdit(elemento){
        setModalTitulo("Editar");
        setModalAction("edit");
        setModalShow(true);
        setPerfil(elemento);
      }
    
      function handleclose() {
        setModalShow(false);
      }
    
      async function loadPerfis() {
        const response = await api.get("perfil");
        setPerfis(response.data);
      }

      async function excluir(id){
        try{
          await api.delete("perfil/" + id)
          loadPerfis();
        }catch(error){
          setErro(true);
          const timer = setTimeout(() => {
            setErro(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
        
      }
    return(
        <div className="container-fluid">
      <Modal
        titulo={modalTitulo}
        action={modalAction}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleclose={handleclose}
        onLoad={() => loadPerfis()}
        perfil={perfil}
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
      {success ? (
            <div className="alert alert-success" role="alert">
              Salvo com sucesso!
            </div>
          ) : (
            ""
          )}
          {erro ? (
            <div className="alert alert-danger" role="alert">
              Não foi possível excluir. Perfil já está associado!
            </div>
          ) : (
            ""
          )}
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-hover table-sm ">
          <caption>Lista de Perfis</caption>
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">NOME</th>
              <th scope="col">OPERAÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {perfis.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.id}</td>
                <td>{elemento.nome}</td>                
                <td>
                  <button type="button" className="btn btn-primary btn-sm " onClick={()=>{openModalEdit(elemento)}}>
                    Editar
                  </button>
                  <button type="button" className="btn btn-danger btn-sm " onClick={() =>{excluir(elemento.id)}}>
                    Excluir
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

export default Perfil;