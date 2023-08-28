import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import Navbar from '../../components/navbar/Navbar';
import Boton from '../../components/boton2/boton';
import Boton2 from '../../components/boton3/boton';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editingImage, setEditingImage] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(
          'https://iotcoremt-production.up.railway.app/user/userLogin',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const formData = new FormData();
      formData.append('image', newImage);

      const response = await fetch(
        'https://iotcoremt-production.up.railway.app/user/userLoged',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setEditingImage(false);
      } else {
        console.error('Error uploading image:', response.status);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <section style={{ backgroundColor: '#f0fffb' }}>
      <Navbar />
      <div className='volver'>
        <Link to='/home' style={{ textDecoration: 'none' }}>
          <Boton2 />
        </Link>
      </div>
      <MDBContainer className='py-5'>
        <MDBRow>
          <MDBCol lg='4'>
            <MDBCard className='mx-auto mb-4 text-center'>
              <MDBCardBody className=''>
                {userData && (
                  <>
                    {editingImage ? (
                      <div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => setNewImage(e.target.files[0])}
                        />
                        <button onClick={handleImageUpload}>Guardar</button>
                      </div>
                    ) : (
                      <>
                        <MDBCardImage
                          src={userData.image}
                          alt='avatar'
                          className='rounded-circle '
                          style={{ maxWidth: '200px' }}
                          fluid
                        />
                        <button onClick={() => setEditingImage(true)}>
                          Editar Imagen
                        </button>
                      </>
                    )}
                    <p className='text-muted mb-1'>{`${userData.firstName} ${userData.lastName}`}</p>
                    <p className='text-muted mb-1'>{userData.location}</p>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
            <Boton />
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nombre</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {userData && (
                      <MDBCardText className="text-muted">{`${userData.firstName} ${userData.lastName}`}</MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {userData && (
                      <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Telefono</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {userData && (
                      <MDBCardText className="text-muted">{userData.phone}</MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Direccion</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {userData && (
                      <MDBCardText className="text-muted">{userData.adress}</MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Maquinas Totales</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {userData && (
                      <MDBCardText className="text-muted">{userData.machinesTotals}</MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
