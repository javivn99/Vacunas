import React from 'react';

const Pricing = () => {
    return (
        function CRUD() {
            //direccion de la API
            const baseUrl = "http://localhost:4004/vacunas/";
            const [data, setData] = useState([]);
            const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
                dosis_pfizer: '',
                dosis_moderna: '',
                pers_pauta_complet: ''
            });

            const handleChange = e => {
                const { name, value } = e.target;
                setFrameworkSeleccionado((prevState) => ({
                    ...prevState,
                    [name]: value
                }))
                console.log(frameworkSeleccionado);
            }

            const peticionGet = async () => {


                await axios.get(baseUrl)
                    .then(response => {
                        setData(response.data);
                        //console.log(response.data);
                    }).catch(error => {
                        console.log(error);
                    })
            }//peticionGet

            const seleccionarFramework = (framework, caso) => {
                setFrameworkSeleccionado(framework);

                (caso === "Editar") ?
                    abrirCerrarModalEditar() :
                    abrirCerrarModalEliminar()
            }

            useEffect(() => {
                peticionGet();
            }, [])

            return (
                <div style={{ textAlign: 'center' }}>
                    <br />
                    <br /><br />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Dosis entregadas en CC.AA</th>
                                <th>Dosis administradas</th>
                                <th>Nº Personas con pauta completa</th>
                                <th>Personas Pauta Completa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(data[0])}
                            {data.map(framework => (
                                <tr key={framework.id}>
                                    {/*console.log(framework.first_name)*/}
                                    {/* el nombre de los campos que vienen a continuacion tienes que ser
              los que nos devuelve el JSON. Fijate en como se llaman cuando te devuelve 
              haciendo una peticion get por la url http://localhost:4008/users/
              [{"id":1,"firstName":"juan","lastName":"Perez"},
              {"id":2,"firstName":"Ana","lastName":"Soria"},
              {"id":3,"firstName":"Luis","lastName":"Rodrigo"},
              {"id":4,"firstName":"Raquel","lastName":"Segovia"}]
  
              
              */}
                                    <td>{framework.sum(dosis_pfizer)}</td>
                                    <td>{framework.dosis_moderna}</td>
                                    <td>{framework.pers_pauta_complet}</td>

                                </tr>
                            ))}


                        </tbody>

                    </table>


                    <Modal isOpen={modalInsertar}>
                        <ModalHeader>Insertar Vacunas</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Comunidad Autonoma: </label>
                                <br />
                                <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                                <br />
                                <label>Dosis Pfizer: </label>
                                <br />
                                <input type="text" className="form-control" name="dosis_pfizer" onChange={handleChange} />
                                <br />
                                <label>Dosis Moderna: </label>
                                <br />
                                <input type="text" className="form-control" name="dosis_moderna" onChange={handleChange} />
                                <br />
                                <label>Personas Pauta Completa: </label>
                                <br />
                                <input type="text" className="form-control" name="pers_pauta_complet" onChange={handleChange} />
                                <br />

                            </div>
                        </ModalBody>
                        <ModalFooter>

                            <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
                            <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEditar}>
                        <ModalHeader>Editar Vacunas</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Comunidad Autonoma: </label>
                                <br />
                                <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                                <br />
                                <label>Dosis Pfizer: </label>
                                <br />
                                <input type="text" className="form-control" name="dosis_pfizer" onChange={handleChange} />
                                <br />
                                <label>Dosis Moderna: </label>
                                <br />
                                <input type="text" className="form-control" name="dosis_moderna" onChange={handleChange} />
                                <br />
                                <label>Personas Pauta Completa: </label>
                                <br />
                                <input type="text" className="form-control" name="pers_pauta_complet" onChange={handleChange} />
                                <br />

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary" onClick={() => peticionPut()}>Modificar</button>{"   "}
                            <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEliminar}>
                        <ModalBody>
                            ¿Estás seguro que deseas eliminar la comunidad {frameworkSeleccionado && frameworkSeleccionado.nombre}?
          </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={() => peticionDelete()}>
                                Sí
            </button>
                            <button className="btn btn-secondary" onClick={() => abrirCerrarModalEliminar()} >
                                No
            </button>
                        </ModalFooter>
                    </Modal>

                </div>
            );
        }
  
    )
}

export default Pricing;