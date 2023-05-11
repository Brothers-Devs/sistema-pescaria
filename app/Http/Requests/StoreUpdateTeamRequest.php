<?php

namespace App\Http\Requests;

use App\Enum\TypesEnum;
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
        $rules = [
            'name' => 'required|string|max:255|unique:teams',
            'type' => [
                'required',
                'string',
                Rule::in([TypesEnum::DOUBLE_TEAM, TypesEnum::TRIO_TEAM])
            ],
            'tournament_id' => [
                'required',
                Rule::exists('tournaments', 'id')
            ],
            'category_id' => [
                'required',
                Rule::exists('categories', 'id')
            ],
            'fishermen' => [
                'sometimes',
                'required',
                'array',
                'min:2',
                'max:2'
            ]
        ];

        if ($this->type == TypesEnum::TRIO_TEAM) {
            $rules['fishermen'] = [
                'sometimes',
                'required',
                'array',
                'min:3',
                'max:3'
            ];
        }

        if ($this->method() == 'PUT' || $this->method() == 'PATCH') {
            $rules['name'] = [
                'required',
                'string',
                'max:255',
                Rule::unique('teams')->ignore($this->team_id)
            ];
        }

        return $rules;
    }
}
