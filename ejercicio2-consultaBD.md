# Consulta BD
## Enunciado
Imagina la siguiente tabla con información acerca de los aportes (inversiones) y retiros que hacen los clientes de una empresa. Esta tabla se llama user_movements y los campos de esta tabla son:
- user_id
 - movement_type
 - amount
 - date
 
Además, cuentas con la tabla user_data, que contiene información sobre los usuarios. Esta incluye los siguientes campos:
 - user_id
 - name
 - last_name

Ahora, te pedimos que escribas una query para obtener cada una de las siguientes consultas:
1. El total de aportes y retiros para diciembre de 2021
2. Cantidad y monto promedio de aportes y rescates por fecha
3. El nombre y apellido del usuario con más aportes

## Resolución

### Lluvia de ideas
1.
(in user_movements)
- Filter by date range (12/01/2021 - 12/31/2021)
- count(group by movement_type == subscription) and count(group by movement_type == withdrawal)
- return those counts
2.
(in user_movements)
- Group by date and movement type 
- count(group by movement type) & average(amount grouped by movement type)
- return the count and average
3.
(in user_movements)
- Count(Group by user (movement_type) == subscription)
- Get user with max count
(user_movements join user_data)
- Join the user with most subscriptions to the other table, get only name and last_name

### Solución propuesta
1.
SELECT 
  COUNT(CASE WHEN movement_type = 'subscription' THEN 1 END) AS total_aportes
  COUNT(CASE WHEN movement_type = 'widthdrawal' THEN 1 END) AS total_retiros
FROM user_movements
WHERE date **BETWEEN** '2021-12-01' AND '2021-12-31';

2.
SELECT 
  date, 
  movement_type,
  COUNT(*) AS cantidad_movimientos,
  AVG(amount) AS promedio_movimientos
FROM user_movements
GROUP BY date, movement_type
ORDER BY date, movement_type;

3.