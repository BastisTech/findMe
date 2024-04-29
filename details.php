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
        <img src="img/FindME.svg" alt="" id="Logo">
        <button id="btn-login">Anmelden</button>
    </header>
    <fieldset>
        <input type="text" id="search_text" placeholder="Suche"><br>
        <input type="date"id="search_date">
        <select name="search_category" id="search_category">

        </select>
        <select name="search_room" id="search_room">

        </select>
    </fieldset>
    <main>
       <table id="results">
        <tr><th>Datum</th><td>14.04.2024</td></tr>
        <tr><th>Produktbezeichnung</th><td>Jacke Schwarz</td></tr>
        <tr><th>fundort</th><td>C4.09</td></tr>
        <tr><th>produktkategorie</th><td>Kleidung</td></tr> 
       </table>
       <fieldset id="results_description">
       <p>Beschreibung</p>
       </fieldset>
    </main>
</body>
</html>