<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once "./config.php";

try{
	$sql = "SELECT code, titel FROM texte";
	
	$stmt = $pdo->prepare($sql); 
	
	// Attempt to execute the prepared statement
	$stmt->execute();
	$results = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	
}catch (Exception $e){	
	echo $e;	
}

// Close statement
unset($stmt);

echo json_encode($results);

?>