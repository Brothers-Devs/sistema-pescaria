<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateResultRequest extends FormRequest
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
            'team_id' => [
                'required',
                Rule::exists('teams', 'id'),
                Rule::unique('results')
            ],
            'fisheries' => [
                'sometimes',
                'required',
                'array',
                'max:12'
            ]
        ];

        if ($this->method() == 'PUT' || $this->method == 'PATCH') {
            $rules['team_id'] = [
                'required',
                Rule::exists('teams', 'id'),
                Rule::unique('results')->ignore($this->team_id)
            ];
        }

        return $rules;
    }
}
