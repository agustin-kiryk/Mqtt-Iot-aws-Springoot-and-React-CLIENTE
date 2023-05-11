import * as React from 'react';
import "./backdrop.scss";
import Backdrop from '@mui/material/Backdrop';

export default function SimpleBackdrop() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div >
            <div className='back'>
            <a onClick={handleOpen}><p>Ver Datos Bancarios</p></a>
            </div>
            <div className='drop'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <p>Nombre: John Córdoba Morales<br />
                    Número de cuenta: 315 33 11 334<br />
                    Tipo: Nequi</p>

            </Backdrop>
            </div>
        </div>
    );
}
