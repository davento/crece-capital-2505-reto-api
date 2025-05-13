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
- Filter by date range (12/01/2021 - 12/31/2021)
- count(group by movement_type == subscription) and count(group by movement_type == withdrawal)
- return those counts
2.
- Group by date for movement type 
- count(group by movement type) & average(group by movement type(average(amount))
- return the count and average
3.
- Count(Group by user (movement_type) == subscription)
- Get user with max count
- Join the user with most subscriptions to the other table, get only name and last_name

### Solución propuesta