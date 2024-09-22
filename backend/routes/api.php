<?php

use App\Http\Controllers\LivroController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/livros',[LivroController::class,'index']);
Route::post('/livros',[LivroController::class,'store']);
Route::get('/livros/{livro}',[LivroController::class,'show']);
Route::put('/livros-update/{livro}',[LivroController::class,'update']);
Route::delete('/livros/{livro}',[LivroController::class,'destroy']);
