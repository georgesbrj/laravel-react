import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CadastroForm from "./components/CadastroForm";
import EditarLivro from "./components/EditarLivro";

function App() {

  //Inicia o esta do livro 
  const [livros, setLivros] = useState([]);
 
  // retorna todos os livros atravez da api 
  const buscaDeLivros = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/livros");
      const data = await response.json();
      setLivros(data.livros);
 
      //console.log(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    buscaDeLivros();
  }, []);


  // funcao para remover o livro 
  const handleDelete =  async (id) => {
    
        try{  

          const response = await fetch(`http://127.0.0.1:8000/api/livros/${id}`,{
            method: 'delete'
          } );

          if(response){
            setLivros(livros.filter(livro => livro.id !== id))
          }

        }catch(error){
          console.log(error)
        }
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>Lista de livros</h2>
              <Link to="/cadastrar">
                <button>Cadastrar</button>
              </Link>
              
              {livros.length === 0 ? (
                <p>Não há livros cadastrados.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Ano de Publicação</th>
                      <th>Gênero</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livros.map((livro) => (
                      <tr key={livro.id}>
                        <td>{livro.id}</td>
                        <td>{livro.titulo}</td>
                        <td>{livro.autor}</td>
                        <td>{livro.ano_publicacao}</td>
                        <td>{livro.genero}</td>
                        <td>
                          <Link to={`/editar/${livro.id}`}>
                            <button>Editar</button>
                          </Link>
                          <button onClick={() => handleDelete(livro.id)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          }
        />
        {/* <Route path="/cadastrar" element={<CadastroForm />} /> */}
        <Route path="/cadastrar" element={<CadastroForm onCadastroSucesso={buscaDeLivros} />} />
          {/* <Route path="/editar/:id" element={<EditarLivro />} /> */}
        <Route path="/editar/:id" element={<EditarLivro  onEditadoSucesso={buscaDeLivros} />} />
      </Routes>
    </Router>
  );
  
}

export default App;
