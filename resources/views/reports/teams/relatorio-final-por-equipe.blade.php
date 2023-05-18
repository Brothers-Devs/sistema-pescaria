<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Relatório Geral</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet"/>
    {{--    <link rel="preconnect" href="https://fonts.googleapis.com">--}}
    {{--    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>--}}
    {{--    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">--}}
    <!-- Styles -->
    <style>
        /*table.customTable {*/
        /*    font-family: 'Roboto', sans-serif;*/
        /*    width: 100%;*/
        /*    background-color: #FFFFFF;*/
        /*    border-collapse: collapse;*/
        /*    border-width: 2px;*/
        /*    border-color: #2B814D;*/
        /*    border-style: solid;*/
        /*}*/

        /*table.customTable td, table.customTable th {*/
        /*    border-width: 2px;*/
        /*    border-color: #2B814D;*/
        /*    border-style: solid;*/
        /*    padding: 5px;*/
        /*}*/

        /*table.customTable thead {*/
        /*    background-color: #2B814D;*/
        /*}*/

        .footer .page-number:after {
            content: counter(page);
        }
    </style>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
@if($categoryId == 1)
    <img src="{!! resource_path('imgs/relatorio_final_categoria_especial.jpeg') !!}" alt="" width="100%">
@endif

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
    <tr>
        <th>Class.</th>
        <th>Equipe</th>
        <th>Pescadores</th>
        <th>Pontuação</th>
    </tr>
    </thead>
    <tbody>
    @php($count = 1)
    @foreach($results as $result)
        <tr>
            <td>{{$count++}}º</td>
            <td>Nº {{$result['id']}} - {{$result['name']}}</td>
            <td>
                @foreach($result['fishermen'] as $fisherman)
                    - {{$fisherman['name']}} <br>
                @endforeach
            </td>
            <td>{{$result['total_points']}}</td>
        </tr>
    @endforeach
    </tbody>
</table>

<div class="footer fixed-section">
    <div class="right">
        <span class="page-number">Pág </span>
    </div>
</div>
</body>
</html>
