class Animal extends Circle
{
    constructor(position, r, t)
    {
        super(position.x, position.y, r)
        this.fillColor = Color.green
        this.velocity = Vector2.zero
        
        this.hp = 1
        
        this.startR = r

        this.defaultSpeed = 30
        this.speed = 200
        
        this.damage = 0

        this.hunger = 0.50
        this.hungerLose = 0.1

        this.team = t
    }
    
    Die()
    {
        RemoveFrom(animals, this)
    }

    Heal(heal)
    {
        this.hp += heal
        if (this.hp > 1) this.hp = 1
    }

    DealDamage(dmg)
    {
        this.hp -= dmg
        if (this.hp <= 0) this.Die()
    }
    
}


class Food extends Circle
{
    constructor(position, r)
    {
        super(position.x, position.y, r)
        this.fillColor = Color.blue
    }
}

function RemoveFrom(array, element)
{
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] == element)
        {
            array.splice(i, 1)
        }
    }
}

function ShowStatOnEntity(entity, stat, fontSize)
{
    let t = entity[stat]
    ctx.fillStyle = "black"
    ctx.font = `${fontSize}px Arial`
    ctx.fillText(t.toFixed(2), entity.position.x - fontSize, entity.position.y + fontSize / 2)
}

Number.Clamp = (val, min, max) =>
{
    return Math.min(Math.max(min, val), max)
}

