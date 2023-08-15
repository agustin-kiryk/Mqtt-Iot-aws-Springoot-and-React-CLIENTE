import * as React from 'react';
import "./botones.scss";
import { Link } from "react-router-dom";

export default function botonesAdmin() {
    return (
        <div className='container'>
        <><><button class="selector">
        <Link to="/new" style={{ textDecoration: "none" }}>
            <span>Agregar Usuarios</span>
            </Link>
        </button><button class="selector">
        <Link to="/new2" style={{ textDecoration: "none" }}>
                <span>Agregar Maquinas</span>
                </Link>
            </button></><button class="selector">
            <Link to="/histfac" style={{ textDecoration: "none" }}>
                <a>Detalles Fc</a>
                </Link>
            </button><button class="selector">
            <Link to="/maquinas" style={{ textDecoration: "none" }}>
                <a>Maquinas</a>
                </Link>
            </button>
            </>
            </div>
    );
}