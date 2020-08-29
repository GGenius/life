const animals = []
const food = []
let teams = {}

const PlayerInGame = false
let Player = null

// SPAWN
for (let i = 0; i < 15; i++)
{
    let position = Entity.RandomCoord(canvas.width-15, canvas.height-15, 15, 15)
    animals.push(new Animal(position, 15, 0))

    Object.assign(animals[animals.length - 1], parametres.herbivores)
    
    animals[animals.length - 1].update = herbivores
}

for (let i = 0; i < 100; i++)
{
    let position = Entity.RandomCoord(canvas.width-5, canvas.height-5, 5, 5)
    food.push(new Food(position, 5))
}
setInterval(function () {
    let position = Entity.RandomCoord(canvas.width-5, canvas.height-5, 5, 5)
    food.push(new Food(position, 5))
}, 1000 * 0.1)

for (let i = 0; i < 5; i++)
{
    let position = Entity.RandomCoord(canvas.width-15, canvas.height-15, 15, 15)
    animals.push(new Animal(position, 15, 1))
    
    Object.assign(animals[animals.length - 1], parametres.predator)

    animals[animals.length - 1].update = predator
}
// SPAWN

// Player spawn
if (PlayerInGame)
{
    Player = new Animal(Entity.RandomCoord(canvas.width/2, canvas.height/2, 0, 0), 30, 3)
    Object.assign(Player, parametres.player)
    Player.update = PlayerBehavior
}

function PlayerBehavior()
{
    let dir = Vector2.Substract(Input.MousePosition, this.position).normalized
    if (Vector2.Distance(Input.MousePosition, this.position) < 2) dir = Vector2.zero
    this.velocity = Vector2.Multiply(dir, this.speed * Time.DeltaTime)

    animals.forEach(animal => {
        let distance = Vector2.Distance(animal.position, this.position)
        if (distance < this.r + animal.r + this.attackRange)
        {
            animal.DealDamage(this.damage * Time.DeltaTime)
            if (animal.hp <= 0)
                {
                    this.hunger += animal.r / 15 * 0.5
                }
        }
    })

    this.position = Vector2.Plus(this.position, this.velocity)
}
// Player spawn

function loop()
{
    draw()
    update()
    
    Time.DeltaTime = (new Date() - Time.LastFrame) / 1000
    Time.LastFrame = new Date()

    requestAnimationFrame(function()
    {
        loop()
    })
}

function update()
{
    teams = {}
    animals.forEach(ent => {
        if (!teams[ent.team]) teams[ent.team] = 1
        else teams[ent.team]++

        ent.update()
    })

    if (PlayerInGame)
        Player.update()
}

function draw()
{
    clear()
    
    ctx.font = '50px Arial'

    ctx.fillStyle = Color.green
    if (!teams[0]) teams[0] = 0
    ctx.fillText(teams[0], 25, 50)

    ctx.fillStyle = Color.red
    if (!teams[1]) teams[1] = 0
    ctx.fillText(teams[1], 125, 50)
    
    animals.forEach(ent => {
        ent.draw()
        //Vector2.ShowVector2(ent.velocity, ent.position, 25, 5)
        //ShowStatOnEntity(ent, 'hp', 30)
    })

    food.forEach(ent => {
        ent.draw()
    })

    if (PlayerInGame)
        Player.draw()
}

loop()

