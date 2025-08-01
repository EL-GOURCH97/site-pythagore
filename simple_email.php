<?php
// Configuration des en-têtes
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Récupérer les données
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont obligatoires']);
    exit;
}

// Configuration email
$to = 'elgourch.jalal9@gmail.com';
$subject = 'Nouveau message - Pythagore Sahara';
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Contenu de l'email
$emailContent = "
<html>
<head>
    <title>Nouveau message de contact</title>
</head>
<body>
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom :</strong> $name</p>
    <p><strong>Email :</strong> $email</p>
    <p><strong>Message :</strong></p>
    <p>" . nl2br(htmlspecialchars($message)) . "</p>
    <hr>
    <p><small>Envoyé depuis le site Pythagore Sahara le " . date('d/m/Y H:i:s') . "</small></p>
</body>
</html>
";

// Tentative d'envoi
if (mail($to, $subject, $emailContent, $headers)) {
    // Sauvegarder dans un fichier log
    $logEntry = date('Y-m-d H:i:s') . " - Nom: $name, Email: $email\n";
    file_put_contents('contact_log.txt', $logEntry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi']);
}
?> 