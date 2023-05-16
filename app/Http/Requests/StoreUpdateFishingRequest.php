<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateFishingRequest extends FormRequest
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
            'result_id' => [
                'required',
                Rule::exists('results', 'id')
            ],
            'team_id' => [
                'required',
                Rule::exists('teams', 'id')
            ],
            'fisherman_id' => [
                'required',
                Rule::exists('fishermen', 'id')
            ],
            'size' => 'required|decimal:2|min:30',
            'points' => 'required|decimal:2',
            'weight' => 'sometimes|nullable|decimal:3',
            'stage' => 'sometimes|nullable|integer'
        ];
    }
}
