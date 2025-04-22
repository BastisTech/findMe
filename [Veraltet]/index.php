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
        <ul>
            <li ><img src="img/FindME.svg" alt="" id="Logo" style="
            width: 150px;"></li>
            <li><a href="login.php">Anmelden</a></li>
            <li><a href="form.php">Neu</a></li>
        </ul>
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
        <tr><th>Datum</th><th>Produktbezeichnung</th><th>fundort</th><th>produktbeschreibung</th></tr>
        <?php
            include("connect.php");
            $ergebnis = mysqli_query($db, "SELECT * FROM Gegenstand");
            while($row = mysqli_fetch_object($ergebnis)){
                if($row->Ausgefasst==0){
                    echo "<tr><td>";
                    echo "$row->Datum_Sicherstellung</td><td>$row->Produktbezeichnung</td> <td>$row->Raum</td> <td>$row->Produktbeschreibung</td>";
                    echo "</tr>";
                }
            }
        ?>
       </table>
    </main>
</body>
</html>