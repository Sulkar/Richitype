<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Include config file
require_once "./config.php";

$results = array();
$results["titel"] = "";
$results["text"] = "";


// Define variables and initialize with empty values
$text_code = "";

$data = json_decode(file_get_contents('php://input'), true);
$text_code = $data["text_code"];

try{
	$sql = "SELECT titel, text, code FROM texte WHERE code = :text_code";

	$stmt = $pdo->prepare($sql);
	// Bind variables to the prepared statement as parameters
	$stmt->bindParam(":text_code", $text_code, PDO::PARAM_STR);
 
	// Attempt to execute the prepared statement
	$stmt->execute();
	if($stmt->rowCount() == 1){			
		if($row = $stmt->fetch()){
			$results["titel"] = $row["titel"];
			$results["text"] = $row["text"];
			$results["code"] = $row["code"];
		}
	}
		
}catch (Exception $e){	
	echo $e;	
}

// Close statement
unset($stmt);

echo json_encode($results);	

?>