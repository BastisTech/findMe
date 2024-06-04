<?php
$db = mysqli_connect("localhost", "root", "", "findme");
if(!$db)
{
    exit("Verbindungsfehler: ".mysqli_connect_error());
}
$GID=$_GET["input_id"];
$G_date=$_GET["input_date"];
$G_name=$_GET["input_name"];
$G_desc=$_GET["input_description"];
$G_Room=$_GET["select_room"];

$eintrag = "INSERT INTO `gegenstand`(`Gegenstand_ID`, `Produktbezeichnung`, `Produktbeschreibung`, `Raum`, `Datum_Sicherstellung`, `Ausgefasst`) 
VALUES ('$GID','$G_name','$G_desc','$G_Room','$G_date','0')";


$eintragen = mysqli_query($db, $eintrag);

mysqli_close($db);
print "<br><a href='index.php'>Startseite</a>"
?>