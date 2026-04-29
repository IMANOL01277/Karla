<?php
class ReportesController {

    public static function handle(string $method): void {
        if ($method !== 'GET') err('Método no permitido', 405);

        $pdo = getDB();

        $summary = $pdo->query("SELECT * FROM v_reportes")->fetch();

        $porLugar = $pdo->query("
            SELECT l.nombre AS lugar,
                   COALESCE(SUM(p.monto), 0) AS total
            FROM lugares l
            LEFT JOIN pagos p ON p.lugar_id = l.id
            GROUP BY l.id, l.nombre
        ")->fetchAll();

        $porServicio = $pdo->query("
            SELECT s.nombre AS servicio,
                   COUNT(c.id) AS total
            FROM servicios s
            LEFT JOIN citas c ON c.servicio_id = s.id
            GROUP BY s.id, s.nombre
        ")->fetchAll();

        $ultimasCitas = $pdo->query("
            SELECT * FROM v_citas
            ORDER BY fecha DESC, hora DESC
            LIMIT 5
        ")->fetchAll();

        ok(compact('summary', 'porLugar', 'porServicio', 'ultimasCitas'));
    }
}