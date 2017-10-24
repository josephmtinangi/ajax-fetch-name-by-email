<?php

if(!isset($_GET['email'])){
    echo json_encode([
        'status' => 'Error',
        'message' => 'You did not supply email',
    ]);
    die();
}else{
    $email = $_GET['email'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "c9";
    
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "SELECT name FROM users WHERE email = :email LIMIT 1";
        
        $stmt = $conn->prepare($sql); 
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        $stmt->execute();
    
        $result = $stmt->fetchAll();
    
        if (count($result) !== 1) {
            echo json_encode([
                'status' => 'Error',
                'message' => 'No user found',
            ]);
            die();
        }
        
        echo json_encode([
            'status' => 'Success',
            'data' => [
                'name' => $result[0]["name"],    
            ]
        ]);
        die();   
    }
    catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}

