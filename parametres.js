const parametres =
{
    herbivores:
    {
        fillColor: Color.green,
        velocity: Vector2.zero,
        hp: 1,
        defaultSpeed: 100,
        damage: 0,
        attackRange: 20,
        hunger: 0.50,
        hungerLose: 0.1,
        canReproduct: true,
        reproductionDuration: 0.5 * 1000,

        baby:
        {
            fillColor: Color.green,
            velocity: Vector2.zero,
            hp: 1,
            defaultSpeed: 100,
            damage: 0,
            attackRange: 20,
            hunger: 0.50,
            hungerLose: 0.1,
            canReproduct: true,
            reproductionDuration: 0.5 * 1000
        }
    },

    predator:
    {
        fillColor: Color.red,
        velocity: Vector2.zero,
        hp: 1,
        defaultSpeed: 70,
        damage: 1,
        attackRange: 20,
        hunger: 0.50,
        hungerLose: 0.05,
        canReproduct: true,
        reproductionDuration: 5 * 1000,

        baby:
        {
            fillColor: Color.red,
            velocity: Vector2.zero,
            hp: 1,
            defaultSpeed: 70,
            damage: 1,
            attackRange: 20,
            hunger: 0.50,
            hungerLose: 0.05,
            canReproduct: true,
            reproductionDuration: 5 * 1000
        }
    },

    player:
    {
        fillColor: Color.orange,
        velocity: Vector2.zero,
        hp: 1,
        defaultSpeed: 100,
        damage: 10,
        attackRange: 0,
        hunger: 0.50,
        hungerLose: 0.05
    }
}