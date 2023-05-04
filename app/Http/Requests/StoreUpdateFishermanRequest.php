<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateFishermanRequest extends FormRequest
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
            'name' => 'required|max:255',
            'cpf' => 'required|min:11|max:11|unique:fishermen',
            'phone' => 'nullable|min:11|max:11',
            'email' => 'nullable|email',
            'country' => 'nullable|string',
            'state' => 'nullable|string|min:2|max:2',
            'city' => 'nullable|string'
        ];
    }
}
