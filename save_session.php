<?php
require "db/connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['size'], $data['moves'], $data['time'], $data['completed'])) {
    http_response_code(400);
    exit("Invalid data");
}

$stmt = $pdo->prepare("
    INSERT INTO game_sessions
    (user_id, puzzle_id, moves, time_seconds, completed, started_at, ended_at)
    VALUES (:user_id, :puzzle_id, :moves, :time_seconds, :completed, datetime('now'), datetime('now'))
");

$stmt->execute([
    ':user_id' => null,
    ':puzzle_id' => null,
    ':moves' => $data['moves'],
    ':time_seconds' => $data['time'],
    ':completed' => $data['completed'] ? 1 : 0
]);

$analytics = $pdo->prepare("
    INSERT INTO analytics (puzzle_id, user_id, event_type)
    VALUES (:puzzle_id, :user_id, :event_type)
");

$analytics->execute([
    ':puzzle_id' => null,
    ':user_id' => null,
    ':event_type' => 'puzzle_completed'
]);

echo json_encode(['status' => 'ok']);
