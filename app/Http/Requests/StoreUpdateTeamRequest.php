<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateTeamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:teams',
            'type' => [
                'required',
                'string',
                Rule::in(['DUPLA', 'TRIO'])
            ],
            'tournament_id' => [
                'required',
                Rule::exists('tournaments', 'id')
            ],
            'category_id' => [
                'required',
                Rule::exists('categories', 'id')
            ]
        ];
    }
}
