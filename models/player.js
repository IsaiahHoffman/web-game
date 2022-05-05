//const x = console.log("Player")

class Player {
    constructor(x, y){
        this.deltaX = x
        this.deltaY = y

        this.move  = function(x, y) {
            this.deltaX += x
            this.deltaY += y
        }
        this.position = function() {
            return this.deltaX + " " + this.deltaY
        }
    }
}
module.exports = Player