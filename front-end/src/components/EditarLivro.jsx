import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarLivro({onEditadoSucesso}) {

  // Obtendo o id 
  const { id } = useParams();

  // Usando a navegação 
  const navigate = useNavigate();

  // Inicia os estados
  const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    ano_publicao: "",
    genero: "",
  });

  // Faz a chamada a api para obter o livro
  useEffect(() => {
    const buscaLivro = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/livros/${id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setLivro(data.livro);
        //console.log(data.livro)
  
      } catch (error) {
        console.log(error);
      }
    };

    buscaLivro();
  }, [id]);

  // Obtem os valores dos imputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtém o nome e o valor do input que foi modificado
    setLivro({
      ...livro, // Mantém os outros campos intactos
      [name]: value, // Atualiza apenas o campo que foi modificado
    });
  };

  // Envia os dados ao back-end
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response =  await  fetch(`http://127.0.0.1:8000/api/livros-update/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });

      if(response.ok){
        onEditadoSucesso()
        navigate("/");
      }
    } catch (error) {
      console.log("Erro ao atualizar o livro", error);
    }
  };

  return (
    <>
      <h1>Formulario de edição </h1>
      <div>
        <h2>Editar Livro</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              value={livro.titulo}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Autor:
            <input
              type="text"
              name="autor"
              value={livro.autor}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Ano de Publicação:
            <input
              type="date"
              name="ano_publicacao"
              value={livro.ano_publicacao}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Gênero:
            <input
              type="text"
              name="genero"
              value={livro.genero}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </>
  );
}

export default EditarLivro;
