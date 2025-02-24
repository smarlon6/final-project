import React from "react";
import aquario3 from "../assets/aquario-5.jpg";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Visite o Aquário Municipal</h1>
      <p className="lead">
      Venha conhecer as maravilhas dos peixes regionais! Inscreva-se para uma visita guiada e mergulhe no mundo aquático.
      </p>
      
      <div className="d-flex justify-content-center">
        <img src={aquario3} alt="Vista Externa do Aquário" className="d-block w-50 rounded" />
      </div>
      


      <div className="mt-4">
        <a href="/inscricao" className="btn btn-primary btn-lg">
          Inscreva-se Agora
        </a>
      </div>
    </div>
  );
}

export default Home;
