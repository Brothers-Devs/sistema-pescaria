<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateTournamentRequest extends FormRequest
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
        $rules = [
            'name' => 'required|unique:tournaments|max:255',
            'state' => 'nullable|min:2|max:2',
            'city' => 'nullable',
            'start_date' => 'required|date_format:Y-m-d',
            'end_date' => 'nullable|data_format:Y-m-d|after_or_equal:start_date'
        ];

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['name'] = [
                'required',
                'max:255',
                Rule::unique('tournaments')->ignore($this->tournament_id)
            ];
        }

        return $rules;
    }
}
