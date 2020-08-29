class Time
{
    static Begin = new Date()
    static LastFrame = this.Begin
    static DeltaTime = 0

    static get FPS()
    {
        return 1000 / Time.DeltaTime
    }

    static get Now()
    {
        return new Date()
    }

    static get Current()
    {
        return Time.Now - Time.Begin
    }
}

class Vector2
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }

    static zero = new Vector2(0, 0)
    static one = new Vector2(1, 1)

    static up = new Vector2(0, -1)
    static down = new Vector2(0, 1)

    static right = new Vector2(1, 0)
    static left = new Vector2(-1, 0)

    get length() 
    {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    get normalized()
    {
        let x = this.x / this.length
        let y = this.y / this.length

	if (this.length === 0) return Vector2.zero

        return new Vector2(x, y)
    }

    Rotate(angle)
    {
        let x = this.x*Math.cos(angle)-this.y*Math.sin(angle);
        let y = this.y*Math.cos(angle)+this.x*Math.sin(angle);
        
        this.x = x
        this.y = y

        return this
    }

    Rotated(angle)
    {
        let x = this.x*Math.cos(angle)-this.y*Math.sin(angle);
        let y = this.y*Math.cos(angle)+this.x*Math.sin(angle);

        return new Vector2(x, y)
    }

    static Distance(a, b)
    {
        let x = a.x - b.x
        let y = a.y - b.y

        return Math.sqrt(x ** 2 + y ** 2)
    }

    static Substract(a, b)
    {
        let x = a.x - b.x
        let y = a.y - b.y

        return new Vector2(x, y)
    }

    static Plus(a, b)
    {
        let x = a.x + b.x
        let y = a.y + b.y

        return new Vector2(x, y)
    }

    static Multiply(vec, a)
    {
        let x = vec.x * a
        let y = vec.y * a

        return new Vector2(x, y)
    }

    static Divide(a, b)
    {
        let x = a.x / b
        let y = a.y / b

        return new Vector2(x, y)
    }

    static Lerp(a, b, k)
    {
        let dir = Vector2.Substract(b, a)
        let x = dir.x * k
        let y = dir.y * k
        return new Vector2(x, y)
    }

    static AngleBetween(a, b)
    {
        let cos = Vector2.DotProduct(a, b) / (a.length * b.length) 
        return Math.acos(cos)
    }

    static AngleBetween2(a, b)
    {
        let angle1 = Math.atan2(a.y, a.x)
        let angle2 = Math.atan2(b.y, b.x)

        return angle1 - angle2
    }

    static DotProduct(a, b)
    {
        return a.x*b.x+a.y*b.y
    }

    static ShowVector2(a, original, scale = 1, lineWidth = 1)
    {
        ctx.beginPath()
        
        ctx.lineWidth = lineWidth

        ctx.moveTo(original.x, original.y)
        ctx.lineTo(original.x + a.x * scale, original.y + a.y * scale)

        ctx.stroke()
    }
}

class Color 
{
    static red = 'rgba(255, 0, 0, 1)'
    static green = 'rgba(0, 255, 0, 1)'
    static blue = 'rgba(0, 0, 255, 1)'

    static black = 'rgba(0, 0, 0, 1)'
    static white = 'rgba(255, 255, 255, 1)'
    
    static orange = 'rgba(255, 128, 0, 1)'
    static yellow = 'rgba(255, 255, 0, 1)'
    static lightblue = 'rgba(0, 128, 255, 1)'
    static purple = 'rgba(127, 0, 255, 1)'

    static pink = 'rgba(255, 102, 255, 1)'
    static cyan = 'rgba(0, 255, 255, 1)'
    static lightred = 'rgba(255, 102, 102, 1)'
    static gray = 'rgba(128, 128, 128, 1)'

    static darkred = 'rgba(204, 0, 0, 1)'
    static darkorange = 'rgba(204, 102, 0, 1)'
    static darkyellow = 'rgba(204, 204, 0, 1)'
    static darkgreen = 'rgba(0, 204, 0, 1)'
    static darkcyan = 'rgba(0, 204, 204, 1)'
    static darkblue = 'rgba(0, 0, 204, 1)'
    static darkpurple = 'rgba(102, 0, 204, 1)'

    static all = 
    [
        this.red, this.green, this.blue, this.white, this.black, this.orange, this.yellow,
        this.lightblue, this.purple, this.pink, this.cyan, this.lightred, this.gray,
        this.darkred, this.darkorange, this.darkyellow, this.darkgreen, this.darkcyan,
        this.darkblue, this.darkpurple
    ]

    static dark =
    [
        this.darkred, this.darkorange, this.darkyellow, this.darkgreen, this.darkcyan, this.darkblue,
        this.darkpurple
    ]

    static rainbow =
    [
        this.red, this.orange, this.yellow, this.green, this.lightblue, this.blue, this.purple
    ]

    static darkrainbow = 
    [
        this.darkred, this.darkorange, this.darkyellow, this.darkgreen, this.darkcyan,
        this.darkblue, this.darkpurple
    ]

    static GetRandomColor() 
    {
       let i = Math.round(Math.random() * (this.all.length + 0.5) - 0.5)
       let c = this.all[i]

       return c
    }

    static GetRandomDarkColor()
    {
        let i = Math.round(Math.random() * (this.dark.length + 0.5) - 0.5)
        let c = this.dark[i]
        
        return c 
    }

    static GetRandomRainbowColor()
    {
        let i = Math.round(Math.random() * (this.rainbow.length + 0.5) - 0.5)
        let c = this.rainbow[i]
        
        return c
    }

    static GetRandomDarkRainbowColor()
    {
        let i = Math.round(Math.random() * (this.darkrainbow.length + 0.5) - 0.5)
        let c = this.darkrainbow[i]
        
        return c
    }
}

class Input 
{
    static MousePosition = new Vector2(0, 0)
    static LeftMouseDown = false
}

window.onmousemove = e =>
{
    Input.MousePosition.x = e.clientX
    Input.MousePosition.y = e.clientY
}

window.onmousedown = e =>
{
    Input.LeftMouseDown = true
}

window.onmouseup = e =>
{
    Input.LeftMouseDown = false
}

class Entity
{
    constructor(x, y)
    {
        this.position = new Vector2(x, y)
        this.fillColor = "#000000"
        this.strokeColor = "#000000"
        this.lineWidth = 1
        this.velocity = new Vector2(0, 0)
        this.mass = 0
	    this.rotation = 0
    }

    update()
    {
        this.position = Vector2.Plus(this.position, this.velocity)
    }

    static RandomCoord(w, h, OffSetX, OffSetY)
    {
        let x = Math.random() * w + OffSetX
        let y = Math.random() * h + OffSetY

        return new Vector2(x, y)
    }
}

class Circle extends Entity
{
    constructor(x, y, r)
    {
        super(x, y)
        this.r = r
    }

    draw()
    {
        if (!ctx) return

        ctx.beginPath()

        ctx.fillStyle = this.fillColor
        ctx.strokeStyle = this.strokeColor

        ctx.lineWidth = this.lineWidth
        

        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI)

        ctx.fill()
        ctx.stroke()

        ctx.closePath()
    }
}

class Line extends Entity
{
    constructor(x, y, l, r)
    {
        super(x, y)

        this.length = l
        this.rotation = r
    }

    draw()
    {
        if (!ctx) return

        ctx.beginPath()

        ctx.fillStyle = this.fillColor
        ctx.strokeStyle = this.strokeColor

        ctx.lineWidth = this.lineWidth

        let endpos = Vector2.Multiply(Vector2.down.Rotated(this.rotation * Math.PI / 180), this.length) 
        endpos = Vector2.Plus(endpos, this.position)

        ctx.moveTo(this.position.x, this.position.y)
        ctx.lineTo(endpos.x, endpos.y)

        ctx.fill()
        ctx.stroke()

        ctx.closePath()
    }
}

