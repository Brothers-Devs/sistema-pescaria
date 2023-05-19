<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Relatório Final por Equipe</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet"/>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ resource_path('/css/bootstrap.min.css') }}">
</head>
<body>

<script type="text/php">
      if ( isset($pdf) ) {
        $w = $pdf->get_width();
        $h = $pdf->get_height();

        $size = 8;
        $color = [0, 0, 0];
        $font = $fontMetrics->getFont("helvetica");
        $text_height = $fontMetrics->getFontHeight($font, $size);
        $y = $h - 2 * $text_height - 24;

        // a static object added to every page
        $foot = $pdf->open_object();
        // Draw a line along the bottom
        $pdf->line(16, $y, $w - 16, $y, $color, 1);
        $y += $text_height;
        $date = date('d/m/Y');
        $pdf->text(16, $y, "Gerado em: $date", $font, $size, $color);
        $pdf->close_object();
        $pdf->add_object($foot, "all");
      }
</script>

<div class="text-center">
    @if($categoryId == 1)
        <img src="{!! resource_path('imgs/relatorio_final_categoria_especial.jpeg') !!}" alt="" width="70%">
    @else
        <img src="{!! resource_path('imgs/relatorio_final_categoria_comum.jpeg') !!}" alt="" width="80%">
    @endif
</div>
<hr>
<table class="table table-striped table-bordered">
    <thead class="table-success">
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
            <td class="align-middle text-center">{{$count++}}º</td>
            <td class="align-middle">{{$result['name']}} (Nº {{$result['id']}})</td>
            <td class="align-middle">
                @foreach($result['fishermen'] as $fisherman)
                    {{$fisherman['name']}} (Nº {{$fisherman['id']}}) <br>
                @endforeach
            </td>
            <td class="align-middle text-center">{{$result['total_points']}}</td>
        </tr>
    @endforeach
    </tbody>
</table>

<script type="text/php">
          if ( isset($pdf) ) {
            $h = $pdf->get_height();

            $size = 8;
            $font_bold = $fontMetrics->getFont("helvetica", "bold");
            $text_height = $fontMetrics->getFontHeight($font_bold, $size);
            $y = $h - $text_height - 24;

            // generated text written to every page after rendering
            $pdf->page_text(540, $y, "Pág. {PAGE_NUM} de {PAGE_COUNT}", $font_bold, $size, [0, 0, 0]);
          }
</script>
</body>
</html>
