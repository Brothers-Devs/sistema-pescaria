<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Relatório Geral</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet"/>

    <!-- Styles -->
</head>
<body>
<img src="{!! resource_path('imgs/relatorio_geral_de_equipes.jpeg') !!}" alt="" width="100%">
<table>
    <thead>
    <tr>
        <th>Nº</th>
        <th>Equipe</th>
        <th>Categoria</th>
        <th>Pontuação</th>
        <th>Classificação</th>
    </tr>
    </thead>
    <tbody>
    @foreach($results as $result)
        <tr>
            <td>{{$result->id}}</td>
            <td>{{$result->team->name}}</td>
            <td>{{$result->team->category->name}}</td>
            <td>{{$result->total_points}}</td>
            <td>{{$result->id}}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
