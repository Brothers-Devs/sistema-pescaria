<?php

declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use App\Models\Fisherman;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResultControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testShouldReturnSuccessWhenFisheriesValid()
    {
        $tournament = Tournament::factory()->create();
        $fishermen = Fisherman::factory(2)->create();
        $team = Team::factory()->create(['tournament_id' => $tournament->id]);

        foreach ($fishermen as $fisherman) {
            $team
                ->fishermen()
                ->attach($fisherman->id, ['tournament_id' =>  $tournament->id]);
        }

        $data = $this->getMockFisheries($team, 2);

        $response = $this->post(
            '/api/results',
            $data,
            [
                'Accept' => 'application/json'
            ]
        );
        $result = json_decode($response->getContent(), true, 512, JSON_THROW_ON_ERROR);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(2, count($result[0]['fisheries']));
    }

    public function testShouldReturnUnprocessableEntityWhenFisheriesMoreThan20Fish()
    {
        $tournament = Tournament::factory()->create();
        $fishermen = Fisherman::factory(2)->create();
        $team = Team::factory()->create(['tournament_id' => $tournament->id]);

        foreach ($fishermen as $fisherman) {
            $team
                ->fishermen()
                ->attach($fisherman->id, ['tournament_id' =>  $tournament->id]);
        }

        $data = $this->getMockFisheries($team, 21);

        $response = $this->post(
            '/api/results',
            $data,
            [
                'Accept' => 'application/json'
            ]
        );
        $result = json_decode($response->getContent(), true, 512, JSON_THROW_ON_ERROR);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertEquals('O campo fisheries não pode ter mais do que 20 itens.', $result['message']);
    }

    private function getMockFisheries(mixed $team, int $count = 1)
    {
        $fisheries = [
            'team_id' => $team->id,
            'fisheries' => []
        ];
        for ($i = 1; $i <= $count; $i++) {
            $fisheries['fisheries'][] = [
                'id' => $i,
                'fisherman_id' => 1,
                'size' => fake()->numerify('3#.##'),
                'points' => fake()->numerify('3#.##'),
            ];
        }

        return $fisheries;
    }
}
