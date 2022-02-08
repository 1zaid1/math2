<!DOCTYPE html>
<html lang = "en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script>
    </head>
    <body>
        <style>
          div {
              display: table-cell;
              vertical-align: middle;
              width: 100%;
              text-align: center;
          }
        </style>
        <div id = "dv" style = "border: 10px dashed #1c87c9;">
            <h3>
                CLICK TO ADD, PRESS 'X' TO DELETE <br>
                (the maximum number of points is 8)
            </h3>
            <main></main>
            <button onclick="popo()" name="button", class="btn btn-success", id="button">UNDO</button>
            <script src="junk.js"></script>
        </div>
    </body>
</html>
