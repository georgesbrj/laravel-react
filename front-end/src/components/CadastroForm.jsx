import { useState } from "react";
import {useNavigate} from 'react-router-dom';
 

function CadastroForm({onCadastroSucesso}) {

  const [titulo,setTitulo] = useState('');
  const [autor,setAutor] = useState('');
  const [genero,setGenero] = useState('');
  const [anoPublicacao,setAnoPublicacao] = useState('');
  const navigate = useNavigate();// Define a navegação 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const livro = {
      titulo,
      autor,
      genero,
      ano_publicacao:anoPublicacao
    };

        try {
          const response = await fetch('http://127.0.0.1:8000/api/livros', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
          });

          if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
          } 

          if (response.ok) {
            // Chama a função para buscar novamente os livros e atualizar a pagina 
            onCadastroSucesso();
          }

          const data = await response.json();

          // retona para a rota raiz 
          navigate('/');
          
          console.log('Livro cadastrado com sucesso:', data);
        } catch (error) {
          console.error('Erro ao cadastrar livro:', error);
        }
      
  
  }


  return (
    <div>
      <h2>Cadastro de Livro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        <br />
        <label>
          Autor:
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Gênero:
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </label>
        <br />
        <label>
          Ano de Publicação:
          <input
            type="text"
            value={anoPublicacao}
            onChange={(e) => setAnoPublicacao(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroForm;
