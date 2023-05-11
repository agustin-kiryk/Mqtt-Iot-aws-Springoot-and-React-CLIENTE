import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Navbar from "../../components/navbar/Navbar";
import Boton from "../../components/boton2/boton"
import Boton2 from "../../components/boton3/boton"
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <section style={{ backgroundColor: '#f0fffb' }}>
      <Navbar />
      <div className='volver'>
      <Link to="/" style={{ textDecoration: "none" }}>
      <Boton2 />
      </Link>
      </div>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
          <MDBCard className="mx-auto mb-4 text-center">
          <MDBCardBody className="">
                <MDBCardImage
                  src="https://cdn.discordapp.com/attachments/1061404202498277458/1105998913749667880/image.png"
                  alt="avatar"
                  className="rounded-circle "
                  style={{ maxWidth: '200px' }}
                  fluid
                />
                <p className="text-muted mb-1">John Córdoba Morales</p>
                <p className="text-muted mb-1">Bay Area, San Francisco, CA</p>

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
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Telefono</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Direccion</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Id Maquina</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">12314</MDBCardText>
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