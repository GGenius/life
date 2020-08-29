if (!PlayerInGame)
{
    canvas.onmousedown = e =>
    {
        animals.forEach(animal => {
            let distance = Vector2.Distance(Input.MousePosition, animal.position)
            if (distance < animal.r)
            {
                DebugEntity(animal)
            }
        })
    }
}

function DebugEntity (entity)
{
    console.log(entity)
}