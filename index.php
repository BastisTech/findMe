<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindME</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <table>
            <tr><td><img src="img/FindME.svg" alt="" id="Logo"></td><button id="btn-login">Anmelden</button><td></td></tr>
        </table> 
    </header>
    <fieldset id="search">
        <input type="text" id="search_text" placeholder="Suche"><br>
        <input type="date"id="search_date">
        <select name="search_category" id="search_category">

        </select>
        <select name="search_room" id="search_room">

        </select>
    </fieldset>
    <main>
       <table id="results">
        <tr><th>Datum</th><th>Produktbezeichnung</th><th>fundort</th><th>produktkategorie</th></tr> 
       </table>
    </main>
</body>
</html>