function herbivores()
{
    let move = Vector2.zero

    this.hunger -= Time.DeltaTime * this.hungerLose

    this.speed = this.defaultSpeed
    if (this.hunger > 1)
    {
        this.speed = this.defaultSpeed/this.hunger * this.hp
    } 
    else if (this.hunger < 0)
    {
        this.DealDamage(0.05 * Time.DeltaTime)
    }
    
    if (this.hunger > 0.75)
    {
        this.Heal(0.1 * Time.DeltaTime)
    }

    if (this.hp <= 0)
    {
        this.Die()
    }

    this.r = Number.Clamp(this.startR + (this.hunger - 1) * 5, 0, Number.POSITIVE_INFINITY)

    let nearestDistToFood = Number.POSITIVE_INFINITY
    let nearestFood = null
    
    food.forEach(f => {
        let dist = Vector2.Distance(f.position, this.position)

        if (dist < nearestDistToFood)
        {
            nearestDistToFood = dist 
            nearestFood = f
        }
    })
    
    if (nearestFood)
    {
        if (nearestDistToFood < this.r)
        {
            RemoveFrom(food, nearestFood)
            this.velocity = Vector2.zero
            this.hunger += 0.15
        }
        else
        {
            let dir = Vector2.Substract(nearestFood.position, this.position)
            this.velocity = Vector2.Multiply(dir.normalized, Time.DeltaTime * this.speed)
        }
    }

    
    let nearestDistToPredator = Number.POSITIVE_INFINITY
    let nearestPredator = null
    animals.forEach(animal => {
        let dist = Vector2.Distance(animal.position, this.position)

        //if (animal.team == 0)
        //{
            if (dist < this.r+animal.r)
            {
                let dir = Vector2.Substract(this.position, animal.position)
                dir = Vector2.Multiply(dir.normalized, animal.r+this.r - dist)
                this.position = Vector2.Plus(this.position, dir)
            }
        //}

        if (dist < nearestDistToPredator)
        {
            if (animal.team == 1)
            {
                nearestDistToPredator = dist
                nearestPredator = animal
            }
        }
    })

    let nearestDistToHerbivore = Number.POSITIVE_INFINITY
    let nearestHerbivore = null

    if (nearestDistToFood > nearestDistToPredator)
    {
        let dirToFood = Vector2.Substract(nearestFood.position, this.position)
        let dirFromPredator = Vector2.Substract(this.position, nearestPredator.position)

        let howFarPercent = 1 - nearestDistToPredator / nearestDistToFood
        let maxAngle = Vector2.AngleBetween2(dirToFood, dirFromPredator)
        let angle = maxAngle * howFarPercent * -1

        let dir = dirToFood.Rotated(angle) //this.velocity.Rotate(angle)

        this.velocity = Vector2.Multiply(dir.normalized, Time.DeltaTime * this.speed)

        //Vector2.ShowVector2(dirToFood, this.position, 15, 5)
        //Vector2.ShowVector2(dirFromPredator, this.position, 15, 5)
        //Vector2.ShowVector2(this.velocity, this.position, 150, 5)
    }
    else if (this.hunger >= 0.7 && this.canReproduct)
    {
        animals.forEach(animal => {
            if (animal == this) return
            if (animal.team != 0) return
            if (animal.hunger < 0.7) return
            if (!animal.canReproduct) return

            let dist = Vector2.Distance(animal.position, this.position)

            if (dist < nearestDistToHerbivore)
            {
                nearestDistToHerbivore = dist
                nearestHerbivore = animal
            }

            if (dist <= this.r+animal.r)
            {
                // baby animal
                animals.push(new Animal(this.position, 10, 0))
                Object.assign(animals[animals.length - 1], parametres.herbivores.baby)
                
                animals[animals.length - 1].update = herbivores
                // baby animal

                this.canReproduct = false
                animal.canReproduct = false

                setTimeout((a) => {a.canReproduct = true}, this.reproductionDuration, this)
                setTimeout((a) => {a.canReproduct = true}, animal.reproductionDuration, animal)
            }
        })
    }

    if (nearestHerbivore)
    {
        let dir = Vector2.Substract(nearestHerbivore.position, this.position).normalized
        this.velocity = Vector2.Multiply(dir, this.speed * Time.DeltaTime) 
    }
    
    this.position = Vector2.Plus(this.position, this.velocity)

    // LIMITED MAP
    if (this.position.x + this.r > canvas.width)
    {
        this.position.x -= this.position.x + this.r - canvas.width
    } 
    else if (this.position.x - this.r < 0)
    {
        this.position.x += this.r - this.position.x
    }

    if (this.position.y + this.r > canvas.height)
    {
        this.position.y -= this.position.y + this.r - canvas.height
    }
    else if (this.position.y - this.r < 0)
    {
        this.position.y += this.r - this.position.y
    }
    // LIMITED MAP
}