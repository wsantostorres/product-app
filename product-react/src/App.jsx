// CSS
import "./App.css"

// Hooks
import { useState, useEffect } from "react";

// Config
import { api, requestConfig } from "./config/config";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { AiOutlineCloudSync } from "react-icons/ai";

function App() {

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {

    (async () => {

      const config = requestConfig("GET", null);

      try {
        const data = await fetch(api + "/products", config)
        .then((res) => res.json())
        .catch((err) => err);

        if(data[0]){
          setProducts(data)
          setRefresh(false)
        }else{
          setProducts([])
        }

      } catch (error) {
        console.log(error)
      }

    })()

  }, [refresh])

  const openModal = () => {
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    modal.classList.remove("hide");
    fade.classList.remove("hide");
  }

  
  const closeModal = () => {
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    modal.classList.add("hide");
    fade.classList.add("hide");
    resetState();
  }

  const resetState = () => {
    setId("")
    setName("");
    setUrl("");
    setToken("");
    setDescription("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name, 
      url,
      token,
      description
    }

    let config;

    try {
      
      if(id){

        config = requestConfig("PUT", data);
        await fetch(api + "/products/" + id, config)

      }else{

        config = requestConfig("POST", data);
        await fetch(api + "/products", config)

      }

      setRefresh(true)
      closeModal()
      resetState();

    } catch (error) {
      console.log(error)
    }
  }

  const getDataForUpdate = async (id) => {
    try {
        let config = requestConfig("GET", null);
        const data = await fetch(api + "/products/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        if(data){
          setId(id)
          setName(data.name)
          setUrl(data.url)
          setToken(data.token)
          setDescription(data.description)
        }

    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async (id) => {
    try {
    
      let config = requestConfig("DELETE", null);
      await fetch(api + "/products/" + id, config);
      
      setRefresh(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div id="page-header">
        <h1>Produtos</h1>
        <button onClick={ openModal } id="open-modal">Novo Produto</button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>DESCRIÇÃO</th>
            <th>ULT. ATUALIZAÇÃO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>

        { products && products.map((product) => (

          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>01-01-2023</td>
            <td className="actions">
              <FaRegTrashAlt onClick={() => deleteProduct(product.id)}/>
              <CiEdit onClick={() => { getDataForUpdate(product.id); openModal(); }}/>
              <AiOutlineCloudSync />
            </td>
          </tr>
          
        ))}

        </tbody>
      </table>

      {/* Modal */}
      <div onClick={ closeModal } id="fade" className="hide"></div>
      <div id="modal" className="hide">
        <div className="modal-header">
          <h2>Produto Nome</h2>
        </div>
        <div className="modal-body">
          <form id="form-product" onSubmit={ handleSubmit }>

              <label>
                <span>Nome: </span>
                <input type="text" onChange={ (e) => setName(e.target.value)} value={name || ""} placeholder="Insira o nome"/>
              </label>

              <label>
                <span>URL: </span>
                <input type="text" onChange={ (e) => setUrl(e.target.value)} value={url || ""} placeholder="Insira a url"/>
              </label>

              <label>
                <span>Token: </span>
                <input type="text" onChange={ (e) => setToken(e.target.value)} value={token || ""} placeholder="Insira o token"/>
              </label>

              <label>
                <span>Descrição: </span>
                <input type="text" onChange={ (e) => setDescription(e.target.value)} value={description || ""} placeholder="Insira uma descrição" />
              </label>

          </form>
        </div>
        <div className="modal-footer">
            <button onClick={ closeModal } id="close-modal">Cancelar</button>
            <button id="confirm" type="submit" form="form-product">Confirmar</button>
        </div>
      </div>


    </div>
  )
}

export default App
