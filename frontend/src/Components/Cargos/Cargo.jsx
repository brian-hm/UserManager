import React, { useEffect, useState } from "react";
import Modal from '../Cargos/ModalAddCargo';
import api from "../../Services/api";

function Cargo(){
    var defaultCargo ={
        id : undefined,
        nome : "",
      };
      const [modalTitulo, setModalTitulo] = useState("");
      const [modalShow, setModalShow] = useState(false);
      const [modalAction, setModalAction] = useState("");
      const [cargos, setCargos] = useState([]);
      const [cargo, setCargo] = useState(defaultCargo);
    
      useEffect(() => {
        loadCargos();
      }, []);
    
      function openModal() {
        setModalTitulo("Adicionar");
        setModalAction("add");
        setModalShow(true);
        setCargo(defaultCargo);
      }
    
      function openModalEdit(elemento){
        setModalTitulo("Editar");
        setModalAction("edit");
        setModalShow(true);
        setCargo(elemento);
      }
    
      function handleclose() {
        setModalShow(false);
      }
    
      async function loadCargos() {
        const response = await api.get("cargo");
        setCargos(response.data);
      }
    return(
        <div className="container-fluid">
      <Modal
        titulo={modalTitulo}
        action={modalAction}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleclose={handleclose}
        onLoad={() => loadCargos()}
        cargo={cargo}
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
          <caption>Lista de Cargos</caption>
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">NOME</th>
              <th scope="col">OPERAÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.id}</td>
                <td>{elemento.nome}</td>                
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

export default Cargo;