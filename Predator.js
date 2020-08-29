function predator()
{  
    this.hunger -= Time.DeltaTime * this.hungerLose

    this.speed = this.defaultSpeed
    if (this.hunger > 1)
    {
        this.speed = this.defaultSpeed/this.hunger * this.hp * 0.5
    } 
    else if (this.hunger < 0)
    {
        this.DealDamage(0.05 * Time.DeltaTime)
    }
    
    if (this.hunger > 0.75 && this.hp < 1)
    {
        this.Heal(0.1 * Time.DeltaTime)
    }

    this.r = Number.Clamp(this.startR + (this.hunger - 1) * 5, 0, Number.POSITIVE_INFINITY)
    //this.damage = 2 + (this.hunger - 1) 

    let nearestAnimal, 
        nearestDist = Number.POSITIVE_INFINITY
    animals.forEach(animal => {
        if (animal == this)
            return

        if (teams[0] > 0)
        {
            if (animal.team == 1)
            {
                return
            }
        }  

        dist = Vector2.Distance(animal.position, this.position)

            if (dist < nearestDist)
            {
                nearestDist = dist 
                nearestAnimal = animal
            }
    })

    this.velocity = Vector2.zero

    if (nearestAnimal)
    {
        let dir = Vector2.Substract(nearestAnimal.position, this.position)
        this.velocity = Vector2.Multiply(dir.normalized, Time.DeltaTime * this.speed)
    }

    
    animals.forEach(animal => {
        if (animal == this) return

        let dist = Vector2.Distance(animal.position, this.position)
        if (dist < this.r+animal.r) 
        {
            let dir = Vector2.Substract(this.position, animal.position)
            dir = Vector2.Multiply(dir.normalized, animal.r+this.r - dist)
            this.position = Vector2.Plus(this.position, dir)            
        }

        if (dist < this.r+animal.r + this.attackRange)
        {
            if (animal.team != 1)
            {
                animal.DealDamage(this.damage * Time.DeltaTime)
                if (animal.hp <= 0)
                {
                    this.hunger += animal.r / 15 * 0.5
                }
            }
        }
    })

    let nearestDistToPredator = Number.POSITIVE_INFINITY
    let nearestPredator = null
    if (this.hunger >= 0.7 && this.canReproduct)
    {
        animals.forEach(animal => {
            if (animal == this) return
            if (animal.team != 1) return
            if (animal.hunger < 0.7) return
            if (!animal.canReproduct) return

            let dist = Vector2.Distance(animal.position, this.position)

            if (dist < nearestDistToPredator)
            {
                nearestDistToPredator = dist
                nearestPredator = animal
            }

            if (dist <= this.r+animal.r)
            {
                // baby animal
                animals.push(new Animal(this.position, 10, 1))
                Object.assign(animals[animals.length - 1], parametres.predator.baby)

                animals[animals.length - 1].update = predator
                // baby animal

                this.canReproduct = false
                animal.canReproduct = false

                setTimeout((a) => {a.canReproduct = true}, this.reproductionDuration, this)
                setTimeout((a) => {a.canReproduct = true}, animal.reproductionDuration, animal)
            }
        })
    }

    if (nearestPredator)
    {
        let dir = Vector2.Substract(nearestPredator.position, this.position).normalized
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