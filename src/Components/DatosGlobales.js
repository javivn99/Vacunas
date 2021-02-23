import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './datosglobales.css';

function Datos_Globales() {
    const baseUrl = "http://localhost:4004/vacunas";
    const [data, setData] = useState([]);

    let [dosisEntregadas, setDosisEntregadas] = useState(0);
    let [dosisAdministradas, setDosisAdministradas] = useState(0);
    let [pers_pauta_complet, setPers_pauta_complet] = useState(0);
    let [dosis_pfizer, setDosis_pfizer] = useState(0);
    let [dosis_moderna, setDosis_moderna] = useState(0);
    let [porcentaje_d_admin, setPorcentaje_d_admin] = useState(0);
    let [porcentaje_pers_pauta, setPorcentaje_pers_pauta] = useState(0);

    const peticionGet = async () => {
        await axios
            .get(baseUrl)
            .then((response) => {
                setData(response.data);
                // console.log(response.data);
                response.data.forEach(function (ccaa) {
                    //Dosis entregadas
                    dosisEntregadas += ccaa.dosis_pfizer + ccaa.dosis_moderna;

                    //Dosis Administradas
                    dosisAdministradas += ccaa.dosis_administradas;

                    //Nº Pers Pauta completa total
                    pers_pauta_complet += ccaa.pers_pauta_complet;

                    //Porcentaje dosis entregadas
                    porcentaje_d_admin = (dosisAdministradas * 100) / dosisEntregadas;

                    //pers_pa*100/entregadas
                    porcentaje_pers_pauta = (pers_pauta_complet * 100) / dosisAdministradas;

                    dosis_pfizer += ccaa.dosis_pfizer;//Sumo todas las de pfizer
                    dosis_moderna += ccaa.dosis_moderna; //Sumo todas las de moderna

                });
                setDosisEntregadas(dosisEntregadas);
                setDosisAdministradas(dosisAdministradas);
                setPers_pauta_complet(pers_pauta_complet);
                setDosis_pfizer(dosis_pfizer);
                setDosis_moderna(dosis_moderna);
                setPorcentaje_d_admin(porcentaje_d_admin.toFixed(1));
                setPorcentaje_pers_pauta(porcentaje_pers_pauta.toFixed(2));

            })
            .catch((error) => {
                console.log(error);
            });

    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div style={{ textAlign: 'center' }, { padding: '25px' }}>
            <div style={{ textAlign: 'left' }}>
                <h1>Datos globales agregados</h1>
                <br></br>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Dosis entregadas en CCAA</th>
                        <th>Dosis administradas</th>
                        <th>Nº Personas con pauta completa</th>
                    </tr>
                </thead>
                <tbody>
                    <td><span className="dosis_global">{dosisEntregadas}</span></td>
                    <td><span className="dosis_glob_1">{dosisAdministradas}</span><hr /><span className="porcentajes">{porcentaje_d_admin}%</span> dosis recibidas</td>
                    <td><span className="dosis_glob_1">{pers_pauta_complet}</span><hr /><span className="porcentajes">{porcentaje_pers_pauta}%</span> dosis administradas</td>
                </tbody>
            </table>
            <hr />

            <div style={{ textAlign: 'left' }}>
                <h3>Distribución por tipo de vacuna</h3>
                <br></br>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Dosis entregadas en CCAA</th>
                        <th>Dosis administradas</th>
                        <th>Nº Personas con pauta completa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="nombrePfizer">Pfizer / BioNtech</td>
                        <td>{dosis_pfizer}</td>
                        <td>-</td>
                        <td>{pers_pauta_complet}</td>
                    </tr>
                    <tr>
                        <td className="nombreModerna">Moderna</td>
                        <td>{dosis_moderna}</td>
                        <td>-</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="lasGrises">AstraZeneca/ Oxford</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td className="lasGrises">Janssen/ J&amp;J</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td><span className="laUltima">Sanofi Pasteur/GSK</span></td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>





        /* FUNCIONA
        <div>
            <header>
                <h1>Datos globales agregados</h1>
            </header>
            <div>
                <div>
                    <h4>Dosis entregadas en CCAA</h4>
                    <span>{dosisEntregadas}</span>
                </div>
                <div>
                    <h4>Dosis administradas</h4>
                    <span>{dosisAdministradas}</span>
                </div>
                <div>
                    <h4>Nº Personas con pauta completa</h4>
                    <span>{pers_pauta_complet}</span>
                </div>
            </div>
        </div>
        */
    );
}

export default Datos_Globales;