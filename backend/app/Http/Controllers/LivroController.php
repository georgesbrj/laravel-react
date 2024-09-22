<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LivroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $livros = Livro::all();

            return response()->json([
                'status' => true,
                'livros' => $livros
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'status' => true,
                'msg' => 'Não foram encontrados livros!'
            ], 404);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            $novoLivro = Livro::create([
                'titulo' => $request->titulo,
                'autor' => $request->autor,
                'genero' => $request->genero,
                'ano_publicacao' => $request->ano_publicacao,
            ]);

            DB::commit();

            if ($novoLivro) {
                return response()->json([
                    'status' => true,
                    'novoLivro' => $novoLivro
                ], 200);
            }
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false
            ], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Livro $livro)
    {
        try{
            return response()->json([
                'status' => true,
                'livro' => $livro
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'status' => true,
                'msg' => 'O livro não foi encontrado'
            ], 404);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Livro $livro)
    {
        DB::beginTransaction();

        $livro = Livro::find($livro->id);

        try {

            $livro->update([
                'titulo' => $request->titulo,
                'autor' => $request->autor,
                'genero' => $request->genero,
                'ano_publicacao' => $request->ano_publicacao
            ]);

            DB::commit();

            if ($livro) {
                return response()->json([
                    'status' => true,
                    'livroAtualizado' => $livro
                ], 201);
            }
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'msg' => 'Erro ao atualizar o livro'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livro $livro)
    {
        try{
            if ($livro->delete()) {
                return response()->json([
                    'status' => true,
                    'livro' => $livro,
                    'msg' => 'O livro foi excluido com sucesso'
                ], 201);
            }
        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'msg' => 'Falha do serviço ao excluir o livro'
            ], 201);
        }
    }
}
