<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = intval($_GET['q']);

mysqli_select_db($con,"test");
$sql=" * FROM user WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);

mysqli_close($con);
?>
</body>
</html>