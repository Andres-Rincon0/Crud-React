import React, {useState} from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


function App() {
  const dataPaises =[
    {id: 1, nombre: "Colombia", minutos: 241},
    {id: 3, nombre: "Brazil", minutos: 225},
    {id: 2, nombre: "Dubai", minutos: 216},
    {id: 4, nombre: "Argentina", minutos: 216 },
    {id: 5, nombre: "Japon", minutos: 207},
    {id: 6, nombre: "Mexico", minutos: 195 },
    {id: 7, nombre: "Rusia", minutos: 191},
    {id: 8, nombre: "USA", minutos: 190},
    {id: 9, nombre: "Italia", minutos: 190},
    {id: 10, nombre: "Francia", minutos: 186}
  ];

  const [data, setData]= useState(dataPaises);
  const[modalEditar, setModalEditar]= useState(false);
  const[modalEliminar, setModalEliminar]= useState(false);
  const[modalInsertar, setModalInsertar]= useState(false);


  const[paisSeleccionado, setPaisSeleccionado]= useState({
    id: "",
    nombre: "",
    minutos:""
  });
  
  const selecionarPais=(elemento, caso)=>{
setPaisSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name,value}=e.target;
    setPaisSeleccionado((prevState)=>({
      ...prevState,
      [name]:value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(pais=>{
      if(pais.id===paisSeleccionado.id){
        pais.minutos=paisSeleccionado.minutos;
        pais.nombre=paisSeleccionado.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(pais=>pais.id!==paisSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setPaisSeleccionado(null);
    setModalInsertar(true)
  }

  const insertar =()=>{
    var valorInsertar=paisSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Paises en los que la gente pasa mas tiempo en redes sociales</h2>
      <br/>
      <button className='btn btn-success' onClick={()=>abrirModalInsertar()}>Insertar</button>
      <br/>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>nombre</th>
            <th>minutos (por dia)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.minutos}</td>
              <td><button className="btn btn-primary" onClick={()=>selecionarPais(elemento, 'Editar')}>Editar</button>{" "}
              <button className="btn btn-danger" onClick={()=>selecionarPais(elemento, 'Eliminar')}>Eliminar</button> </td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar pais</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID</label>
          <input 
          className='form-control'
          readOnly
          type='text'
          name='id'
          value={paisSeleccionado && paisSeleccionado.id}
          />
          <br/>

          
            <label>Pais</label>
          <input 
          className='form-control'
          type='text'
          name='nombre'
          value={paisSeleccionado && paisSeleccionado.nombre}
          onChange={handleChange}
          />
          <br/> 

          <label>Minutos</label>
          <input 
          className='form-control'
          
          type='text'
          name='Minutos'
          value={paisSeleccionado && paisSeleccionado.minutos}
          onChange={handleChange}
          />
          <br/> 
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>editar()}>
            Actualizar
          </button>

          <button className='btn btn-danger'
          onClick={()=>setModalEditar(false)}
          >
          cancelar
          </button>
        </ModalFooter>
      </Modal>

    <Modal isOpen={modalEliminar}>
      <ModalBody>
        ¿Estas seguro que deseaas eliminar el pais {paisSeleccionado && paisSeleccionado.nombre}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>eliminar()}>Si</button>
        <button className='btn btn-secondary'
        onClick={()=>setModalEliminar(false)}
        >No</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalInsertar}>
      <ModalHeader>
        <div >
          <h3>Insertar pais</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className='form-group'>
          <label>ID</label>
          <input
          className='form-control'
          readOnly
          type='text'
          name='id'
          value={data[data.length-1].id+1}
          />
          
          <br/>

          <label>Pais</label>
          <input
          className='form-control'
          type='text'
          name='nombre'
          value={paisSeleccionado ? paisSeleccionado.nombre: ""}
          onChange={handleChange}
          />
          <br/>
          
          <label>Minutos</label>
          <input
          className='form-control'
          type='text'
          name='minutos'
          value={paisSeleccionado ? paisSeleccionado.minutos: ""}
          onChange={handleChange}
          />
          <br/>

        </div>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-primary'
        onClick={()=>insertar()}
        >
          Insertar
         
        </button>
          

        <button className='btn btn-danger'
        onClick={()=>setModalInsertar(false)}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
    </div>
  );
}

export default App;
