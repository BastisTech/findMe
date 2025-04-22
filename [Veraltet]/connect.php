<?php
$db = mysqli_connect("localhost", "root", "", "findme");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
?>