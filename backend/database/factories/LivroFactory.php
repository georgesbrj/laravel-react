<?php

namespace Database\Factories;

use App\Models\Livro;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Livro>
 */
class LivroFactory extends Factory
{

    protected $model = Livro::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
         'titulo' => $this->faker->sentence(),
         'autor'  => $this->faker->name(),
         'genero' => $this->faker->word(),
         'ano_publicacao' => $this->faker->date()
        ];
    }
}
