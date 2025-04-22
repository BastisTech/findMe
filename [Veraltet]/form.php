<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindME</title>
    <link rel="stylesheet" href="style.css">
</head>
<header>
    <ul>
        <li ><img src="img/FindME.svg" alt="" id="Logo" style="
            width: 150px;"></li>
        <li><a href="login.php">Anmelden</a></li>
    </ul>
</header>
<body>
<h2>Gegenstand anlegen</h2>
<form action="insert.php" method="get">
    <label for="input_ID">Gegenstand ID: </label>
    <input type="text" name="input_id" id="input_id" placeholder="SPG-00000"><br>
    <label for="input_date">Datum: </label>
    <input type="date" name="input_date" id="input_date"><br>
    <label for="input_name">Bezeichnung: </label>
    <input type="text" name="input_name" id="input_name"><br>
    <label for="input_name">Beschreibung: </label>
    <input type="text" name="input_description" id="input_description"><br>
    <label for="select_room">Fundort: </label>
    <select name="select_room" id="select_room">
        <?php
        include("connect.php");
        $ergebnis = mysqli_query($db, "SELECT * FROM raum");
        while($row = mysqli_fetch_object($ergebnis)){
            if($row->ausgefasst==0){
                echo "<option value='$row->ID'>";
                echo "$row->Bezeichnung";
                echo "</option>";
            }
        }
        ?>
    </select><br>
    <button type="submit">Absenden</button><button type="reset">zurücksetzen</button>
</form>
</body>
</html>