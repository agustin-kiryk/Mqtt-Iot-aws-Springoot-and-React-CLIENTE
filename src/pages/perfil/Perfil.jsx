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

import Boton2 from '../../components/boton3/boton';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { Height } from '@mui/icons-material';

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
      formData.append('file', newImage); 
      formData.append('upload_preset', 'shvapk2i'); 
  
      const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dpjnr25nl/image/upload'; 
  
      const response = await axios.post(cloudinaryUploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      if (response.status === 200) {
        const imageUrl = response.data.secure_url; 
  
        
        const updateUserImageResponse = await fetch(
          'https://iotcoremt-production.up.railway.app/user/userLoged', // Update this URL to your actual endpoint
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageUrl }),
          }
        );
  
        if (updateUserImageResponse.ok) {
          const data = await updateUserImageResponse.json();
          setUserData(data);
          setEditingImage(false);
        } else {
          console.error('Error updating user image:', updateUserImageResponse.status);
        }
      } else {
        console.error('Error uploading image to Cloudinary:', response.status);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  return (
    <div className='container2'>
    <section style={{ backgroundColor: '#f0fffb'  }} >
      <Navbar />
      <div className='volver'>
        <Link to='/home' style={{ textDecoration: 'none'}}>
          <Boton2 />
        </Link>
      </div>
      <MDBContainer className='d-flex flex-column min-vh-100'>
        <MDBRow>
          <MDBCol lg='4'>
            <MDBCard className='mx-auto mb-4 text-center'>
              <MDBCardBody className=''>
                {userData && (
                  <>
                    {editingImage ? (
                      <div>
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
                      </>
                    )}
                    <p className='text-muted mb-1'>{`${userData.firstName} ${userData.lastName}`}</p>
                    <p className='text-muted mb-1'>{userData.location}</p>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
            <MDBCardBody className='d-flex justify-content-center align-items-center'>
  {userData && (
    <>
      {editingImage ? (
        <div>
          <input
            type='file'
            onChange={(e) => setNewImage(e.target.files[0])}
          />
          <button
            className='btn'
            style={{
              backgroundColor: '#048404',
              color:'white',
              borderRadius: '8px',
            }}
            onClick={handleImageUpload}
          >
            Guardar
          </button>
        </div>
      ) : (
        <>
          <button
            className='btn'
            style={{
              backgroundColor: '#048404',
              color:'white',
              borderRadius: '8px',
            }}
            onClick={() => setEditingImage(true)}
          >
            Editar Imagen
          </button>
        </>
      )}
    </>
  )}
</MDBCardBody>


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
    </div>
  );
}
