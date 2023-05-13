import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import "./login1.scss";
import Navbar from "../../components/navbar/Navbar";

function App() {
  return (
    <MDBContainer className="my-6 gradient-form"  color='black'>
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://cdn.discordapp.com/attachments/1061404202498277458/1104503779795140618/18067b8c-fc00-4ca3-9c02-eaea4b3c7f21.jpg"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Madre tierra Group</h4>
            </div>
            <div className='texto'>    
              <p>Por favor ingrese su usuario</p>
            </div>
        
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Contraseña' id='form2' type='password'/>

           <div className='text-center pt-1 mb-5 pb-1'>
            <button className='ingresar'> <p>Ingresar</p></button>
           </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5"  >
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4"> Somos mas que solo una compania</h4>
              <p class="small mb-0">En Madre Tierra Group, podes encontrar la mejor calidad de agua del país. 
              Nuestra misión es cuidar tu bienestar y tu economía, por eso te ofrecemos la mejor calidad de agua a un precio incomparable.
              Para mas informacion porfavor comuníquese con alguno de nuestros representantes
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;