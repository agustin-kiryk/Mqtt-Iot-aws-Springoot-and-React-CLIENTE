import * as React from 'react';
import "./backdrop.scss";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
            <Button onClick={handleOpen}><p>Ver Datos Bancarios</p></Button>
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