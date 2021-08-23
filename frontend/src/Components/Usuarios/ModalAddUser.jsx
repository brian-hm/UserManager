import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../Services/api";
import InputMask from "react-input-mask";

function ModalAddUser(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("N");
  const [cargos, setCargos] = useState([]);
  const [perfis, setPerfis] = useState([]);
  const [inputPerfis, setInputPerfis] = useState([]);
  const [inputCargo, setInputCargo] = useState("N");
  const [erro, setErro] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearInput() {
    setNome("");
    setCpf("");
    setDataNascimento("");
    setSexo("N");
    setInputPerfis([]);
    setInputCargo("N");
  }

  useEffect(() => {
    loadCargos();
    loadPerfis();
    setNome(props.usuario.nome);
    setCpf(props.usuario.cpf);
    setDataNascimento(props.usuario.dataNascimento);
    setSexo(props.usuario.sexo);
    setInputCargo(props.usuario.cargo.id);
    setInputPerfis(props.usuario.perfis);
  }, [props]);

  async function loadCargos() {
    const response = await api.get("cargo");
    setCargos(response.data);
  }

  async function loadPerfis() {
    const responde = await api.get("perfil");
    setPerfis(responde.data);
  }

  async function save() {
    if (
      cpf.length === 0 ||
      nome.length === 0 ||
      inputCargo === "N" ||
      sexo === "N"
    ) {
      setErro(true);
      const timer = setTimeout(() => {
        setErro(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      var cargoObj = {
        id: inputCargo,
      };
      var cpfClean = cpf.replace(/\D/g,"");
      const usuario = {
        "@type": "usuario",
        nome: nome,
        cpf: cpfClean,
        dataNascimento: dataNascimento,
        sexo: sexo,
        cargo: cargoObj,
        perfis: inputPerfis,
      };
      if (props.action === "add") {
        try {
          await api.post("usuario", JSON.stringify(usuario), {
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
          await api.put("usuario/" + props.usuario.id, JSON.stringify(usuario), {
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
            <div className="row">
              <div className="col-sm">
                <label className="col-form-label">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  value={cpf}
                  className="form-control"
                  onChange={(e) => setCpf(e.target.value)}
                  id="recipient-cpf"
                />
              </div>
              <div className="col-sm">
                <label className="col-form-label">Data de nascimento</label>
                
                <InputMask
                  mask="99/99/9999"
                  value={dataNascimento}
                  className="form-control"
                  onChange={(e) => setDataNascimento(e.target.value)}
                  id="recipient-dataNascimento"
                />
              </div>
              <div className="col-sm">
                <label className="col-form-label">Sexo</label>
                <select
                  className="form-control"
                  name="select"
                  onChange={(e) => {
                    setSexo(e.target.value);
                  }}
                >
                  <option value="N" selected={"N" === sexo}>
                    Selecione
                  </option>
                  <option value="M" selected={"M" === sexo}>
                    Masculino
                  </option>
                  <option value="F" selected={"F" === sexo}>
                    Feminino
                  </option>
                </select>
              </div>
              <div className="row">
                <div className="col-sm">
                  <label className="col-form-label">Cargo</label>
                  <select
                    className="form-control"
                    name="select"
                    onChange={(e) => setInputCargo(e.target.value)}
                  >
                    <option value="N" selected={"N" === inputCargo}>
                      Selecione
                    </option>
                    {cargos.map((elemento, index) => (
                      <option
                        key={index}
                        value={elemento.id}
                        selected={elemento.id === inputCargo}
                      >
                        {elemento.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm">
                  <label className="col-form-label">Perfis</label>
                  {perfis.map((elemento, index) => (
                    <div key={index} className="form-check ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={elemento.id}
                        id="flexCheckDefault"                   
                        onChange={(e) => {
                          var obj = { id: e.target.value };
                          inputPerfis.push(obj);
                        }}
                      />
                      <label className="form-check-label">
                        {elemento.nome}
                      </label>
                    </div>
                  ))}
                </div>
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

export default ModalAddUser;
