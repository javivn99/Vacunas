import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function Datos_Globales(){
    const baseUrl = "http://localhost:4004/vacunas/";
    const [data, setData] = useState([]);
    const [dosis_entregadas, setDosisEntregadas] = useState(0); //BUSCAR COMO USAR HOOKS CON REACT
    const [dosis_administradas, setDosisAdministradas] = useState(0);
    const [personas_pauta_completa, setPersonasPautaCompleta] = useState(0);

    const peticionGet = async () => { //Con esto guardo un array con todos los datos de la bdd.
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);

                let d_entregadas = 0;
                let d_administradas = 0;
                let d_pers_pauta = 0;

                response.data.forEach(vacuna => {
                    d_entregadas = d_entregadas + vacunas.dosis_entregadas;
                    d_administradas = d_administradas + vacunas.dosis_administradas;
                    d_pers_pauta = d_pers_pauta + vacunas.personas_pauta_completa;
                });
                setDosisEntregadas(d_entregadas);
                setDosisAdministradas(d_administradas);
                setPersPautaComplet(d_pers_pauta);

                //console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }//peticionGet

    //Esta linea indica que la primera funcion en ejecutarse sea el get
    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <div>
            <h1>Datos globales</h1>
            <div>
                <h3>Dosis entregadas en CC.AA</h3>
                <p></p>
            </div>
            <div>
                <h3>Dosis administradas</h3>

            </div>
            <div>
                <h3>Nº Personas con pauta completa</h3>

            </div>
        </div>
    );
}

export default Datos_Globales;