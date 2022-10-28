import './App.css';

function App() {

  const PORT = 5000

  function abrirArchivo(e) {
    var archivo = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(archivo);
    fileReader.addEventListener('load', (e) => {
      document.querySelector('#editor').value = fileReader.result;
    });
  }

  function ejecutar() {
    console.log(document.querySelector('#editor').value)
    var txt = {
      'Contenido': document.querySelector('#editor').value
    }
    fetch(`http://localhost:${PORT}/analizar`, {
      method: 'POST',
      body: JSON.stringify(txt),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(res => res.json())
      .catch(err => {
        console.error('Error:', err)
        alert("Error")
      })
      .then(response => {
        console.log(response.Salida);
        document.querySelector('#consola').value = response.Salida;
      })
  }

  return (
    <><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href=""> MIA - Proyecto 2 - 202010893</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="btn btn-dark nav-link" type="button" data-bs-toggle="modal" data-bs-target="#cargar"> Abrir Archivo</button>
          </li>
          <li>
            <button className="btn btn-dark nav-link" onClick> Reportes </button>
          </li>
          <li>
            <button className="btn btn-primary" type="button" onClick={ejecutar}> Ejecutar </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <div className="modal fade" id="cargar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Cargar Archivo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type="file" className="form-control" aria-label="Upload" accept=".script" onChange={abrirArchivo} required />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    </div>

    <form id="formEditor">
      <label htmlFor="Entrada" className="form-label titulos">Script</label>
      <textarea className=" form-control" id="editor" wrap="off"> </textarea>
      <div style={{ marginBottom: '25px' }} ></div>
    </form>
    <form id="formConsola">
      <label htmlFor="Salida" className="form-label titulos" > Consola </label>
      <textarea className=" form-control" id="consola" wrap="off" readOnly> </textarea>
      <div style={{ marginBottom: '25px' }} ></div>
    </form>
  </>
  );
}

export default App;
