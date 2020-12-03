class bola {
    constructor(radio, posicionX, posicionY, velocidadX, velocidadY, color) {
        this.radio = radio;
        this.x = posicionX;
        this.y = posicionY;
        this.vX = velocidadX;
        this.vY = velocidadY;
        this.color = color;
        //Creacion del tag
        this.tagCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.tagCircle.setAttributeNS(null, "r", this.radio);
        this.tagCircle.setAttributeNS(null, "cx", this.x);
        this.tagCircle.setAttributeNS(null, "cy", this.y);
        this.tagCircle.setAttributeNS(null, "fill", this.color);
        document.getElementById("panel").appendChild(this.tagCircle);
    }

    mover(jugador1, jugador2){
        var tamanoSVG = document.getElementsByTagName("svg")[0].getBoundingClientRect();
        if (this.x + this.vX - this.radio < 0 || this.x + this.vX + this.radio > tamanoSVG.width) {
            this.x = tamanoSVG.width/2;
            this.y = tamanoSVG.height/2;
        }
        if (this.y + this.vY - this.radio < 0 || this.y + this.vY + this.radio > tamanoSVG.height) {
            this.vY *= -1;
        }
        this.colision(jugador1);
        this.colision(jugador2);
        this.x += this.vX;
        this.y += this.vY;
    }
    colision(barra){
        var puntosBarraX = [barra.x, barra.x + barra.ancho];
        var puntosBarraY = [barra.y, barra.y + barra.alto];
        var puntosCirculoX = [this.x, this.x + this.radio, this.x, this.x - this.radio, this.x + (Math.cos(45) * this.radio), this.x + (Math.cos(45) * this.radio), this.x - (Math.cos(45) * this.radio), this.x - (Math.cos(45) * this.radio)];
        var puntosCirculoY = [this.y - this.radio, this.y, this.y + this.radio, this.y, this.y - (Math.sin(45) * this.radio), this.y + (Math.sin(45) * this.radio), this.y + (Math.sin(45) * this.radio), this.y - (Math.sin(45) * this.radio)];
        var cont = 0;
        var colision = false;
        do {
            if (puntosCirculoX[cont] > puntosBarraX[0] && puntosCirculoX[cont] < puntosBarraX[1]) {
                if (puntosCirculoY[cont] > puntosBarraY[0] && puntosCirculoY[cont] < puntosBarraY[1]) {
                    this.vX *= -1;
                    colision = true;
                }
            }
            cont++;
        } while ((puntosCirculoX.length == 0 && puntosCirculoY.length == 0) || (colision = false));
    }
    dibujar() {       
        this.tagCircle.setAttributeNS(null, "cx", this.x);
        this.tagCircle.setAttributeNS(null, "cy", this.y);
    }
}

class barra {
    constructor(x, y, alto, ancho, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.alto = alto;
        this.ancho = ancho;
        //Creacion del tag
        this.tagRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.tagRect.setAttribute("x", this.x);
        this.tagRect.setAttribute("y", this.y);
        this.tagRect.setAttribute("width", this.ancho);
        this.tagRect.setAttribute("height", this.alto);
        this.tagRect.setAttribute("fill", this.color);
        document.getElementById("panel").appendChild(this.tagRect);
    }
    
    moverArriba(){
        if(this.y > 0){
            this.y = this.y - 2;
        }
    }
    moverAbajo(){
        var tamanoSVG = document.getElementById("panel").getBoundingClientRect();
        if(this.y + this.alto < tamanoSVG.height){
            this.y = this.y + 2;
        }
    }
    dibujar(){
        this.tagRect.setAttribute("y", this.y);
    }
}

class juego {
    empezar(){
        document.addEventListener("keydown", (e) => {this.mover(e)});
        document.addEventListener("keyup", (e) => {this.parar(e)});
        var tamanoSVG = document.getElementById("panel").getBoundingClientRect();
        this.pelota = new bola(10,tamanoSVG.width/2,tamanoSVG.height/2,2,2,"red");
        this.jugador1 = new barra(10,(tamanoSVG.height-100)/2,100,7,"white");
        this.jugador2 = new barra(tamanoSVG.width-17,(tamanoSVG.height-100)/2,100,7,"white");
        setInterval (() => {
            this.pelota.mover(this.jugador1, this.jugador2);
            this.pelota.dibujar();
            if (this.arriba1)
                this.jugador1.moverArriba();
            if (this.abajo1)   
                this.jugador1.moverAbajo();
            if (this.arriba2)
                this.jugador2.moverArriba();
            if(this.abajo2)
                this.jugador2.moverAbajo();
            this.jugador1.dibujar();
            this.jugador2.dibujar();
        }, 1);
    }        
    mover(e){
        if(e.keyCode == 87)
            this.arriba1 = true;
        if(e.keyCode == 83)
            this.abajo1 = true;
        if(e.keyCode == 38)
            this.arriba2 = true;
        if(e.keyCode == 40)
            this.abajo2 = true;
    }
    parar(e){
        if(e.keyCode == 87)
            this.arriba1 = false;
        if(e.keyCode == 83)
            this.abajo1 = false;
        if(e.keyCode == 38)
            this.arriba2 = false;
        if(e.keyCode == 40)
            this.abajo2 = false;
    }
}

juego = new juego();
window.onload = () => {
    juego.empezar();
}
