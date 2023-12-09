var lienzo = document.getElementById("lienzo");
var ctx = lienzo.getContext("2d");
var img = new Image();

lienzo.width = 1024;
lienzo.height = 576;

var juegoAhorcado = {
    categorias: {
        animales: ["Lobo", "Oveja", "Caballo", "Vaca", "Cerdo", "Escorpion"],
        transporte: ["Caballo", "Tren", "Carreta"],
        edificios: ["Taberna", "Escuela", "Banco", "Sherift", "Iglesia"]
    },
    teclasSeleccionadas: [],
    palabraVisible: "",
    coloresEspacios: [],
    teclasBloqueadas: [],
    palabraSeleccionada: "",
    encontrarTodasLasPosiciones: function (palabra, letra) {
        var posiciones = [];
        for (var i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                posiciones.push(i);
            }
        }
        return posiciones;
    },
    teclado: function () {
        // Configurar el estilo del texto
        ctx.fillStyle = "#5b3104";

        ctx.fillRect(250, 490, 25, 25); // 246, 593, 22, 22 
        ctx.fillRect(280, 490, 25, 25);
        ctx.fillRect(310, 490, 25, 25);
        ctx.fillRect(340, 490, 25, 25);
        ctx.fillRect(370, 490, 25, 25);
        ctx.fillRect(400, 490, 25, 25);
        ctx.fillRect(430, 490, 25, 25);
        ctx.fillRect(460, 490, 25, 25);
        ctx.fillRect(490, 490, 25, 25);
        ctx.fillRect(520, 490, 25, 25);

        ctx.fillRect(250, 520, 25, 25); // 256, 523, 22, 22
        ctx.fillRect(280, 520, 25, 25);
        ctx.fillRect(310, 520, 25, 25);
        ctx.fillRect(340, 520, 25, 25);
        ctx.fillRect(370, 520, 25, 25);
        ctx.fillRect(400, 520, 25, 25);
        ctx.fillRect(430, 520, 25, 25);
        ctx.fillRect(460, 520, 25, 25);
        ctx.fillRect(490, 520, 25, 25);
        ctx.fillRect(520, 520, 25, 25);

        ctx.fillRect(280, 550, 25, 25);
        ctx.fillRect(310, 550, 25, 25);
        ctx.fillRect(340, 550, 25, 25);
        ctx.fillRect(370, 550, 25, 25);
        ctx.fillRect(400, 550, 25, 25);
        ctx.fillRect(430, 550, 25, 25);
        ctx.fillRect(460, 550, 25, 25);

        // Configurar el estilo del texto
        ctx.fillStyle = "#fff";
        ctx.font = "18px 'Pixelify Sans', sans-serif";
        ctx.fillText("Q", 255, 508);
        ctx.fillText("W", 285, 508);
        ctx.fillText("E", 315, 508);
        ctx.fillText("R", 345, 508);
        ctx.fillText("T", 375, 508);
        ctx.fillText("Y", 405, 508);
        ctx.fillText("U", 435, 508);
        ctx.fillText("I", 465, 508);
        ctx.fillText("O", 495, 508);
        ctx.fillText("P", 525, 508);

        ctx.fillText("A", 255, 538);
        ctx.fillText("S", 285, 538);
        ctx.fillText("D", 315, 538);
        ctx.fillText("F", 345, 538);
        ctx.fillText("G", 375, 538);
        ctx.fillText("H", 405, 538);
        ctx.fillText("J", 435, 538);
        ctx.fillText("K", 465, 538);
        ctx.fillText("L", 495, 538);
        ctx.fillText("Ñ", 525, 538);

        ctx.fillText("Z", 285, 568);
        ctx.fillText("X", 315, 568);
        ctx.fillText("C", 345, 568);
        ctx.fillText("V", 375, 568);
        ctx.fillText("B", 405, 568);
        ctx.fillText("N", 435, 568);
        ctx.fillText("M", 465, 568);

        var self = this;
        lienzo.addEventListener('click', function (evento) {
            var x = evento.clientX - lienzo.getBoundingClientRect().left;
            var y = evento.clientY - lienzo.getBoundingClientRect().top;

            // Verificar en qué región se hizo clic
            var teclas = [
                { letra: "Q", x: 250, y: 490, ancho: 25, alto: 25 },
                { letra: "W", x: 280, y: 490, ancho: 25, alto: 25 },
                { letra: "E", x: 310, y: 490, ancho: 25, alto: 25 },
                { letra: "R", x: 340, y: 490, ancho: 25, alto: 25 },
                { letra: "T", x: 370, y: 490, ancho: 25, alto: 25 },
                { letra: "Y", x: 400, y: 490, ancho: 25, alto: 25 },
                { letra: "U", x: 430, y: 490, ancho: 25, alto: 25 },
                { letra: "I", x: 460, y: 490, ancho: 25, alto: 25 },
                { letra: "O", x: 490, y: 490, ancho: 25, alto: 25 },
                { letra: "P", x: 520, y: 490, ancho: 25, alto: 25 },

                { letra: "A", x: 250, y: 520, ancho: 25, alto: 25 },
                { letra: "S", x: 280, y: 520, ancho: 25, alto: 25 },
                { letra: "D", x: 310, y: 520, ancho: 25, alto: 25 },
                { letra: "F", x: 340, y: 520, ancho: 25, alto: 25 },
                { letra: "G", x: 370, y: 520, ancho: 25, alto: 25 },
                { letra: "H", x: 400, y: 520, ancho: 25, alto: 25 },
                { letra: "J", x: 430, y: 520, ancho: 25, alto: 25 },
                { letra: "K", x: 460, y: 520, ancho: 25, alto: 25 },
                { letra: "L", x: 490, y: 520, ancho: 25, alto: 25 },
                { letra: "Ñ", x: 520, y: 520, ancho: 25, alto: 25 },

                { letra: "Z", x: 280, y: 550, ancho: 25, alto: 25 },
                { letra: "X", x: 310, y: 550, ancho: 25, alto: 25 },
                { letra: "C", x: 340, y: 550, ancho: 25, alto: 25 },
                { letra: "V", x: 370, y: 550, ancho: 25, alto: 25 },
                { letra: "B", x: 400, y: 550, ancho: 25, alto: 25 },
                { letra: "N", x: 430, y: 550, ancho: 25, alto: 25 },
                { letra: "M", x: 460, y: 550, ancho: 25, alto: 25 }
            ];
            for (var i = 0; i < teclas.length; i++) {
                if (
                    x > teclas[i].x &&
                    x < teclas[i].x + teclas[i].ancho &&
                    y > teclas[i].y &&
                    y < teclas[i].y + teclas[i].alto
                ) {
                    // Verificar si la tecla está bloqueada
                    if (!self.teclasBloqueadas.includes(teclas[i].letra)) {
                        // Marcar la tecla como bloqueada
                        self.teclasBloqueadas.push(teclas[i].letra);
    
                        // Verificar si la letra está en la palabra
                        if (self.palabraSeleccionada.includes(teclas[i].letra)) {
                            // Recorrer cada posición de la letra en la palabra
                            for (var j = 0; j < self.palabraSeleccionada.length; j++) {
                                // Validar si la letra en la posición j es igual a la letra presionada
                                if (self.palabraSeleccionada[j] === teclas[i].letra) {
                                    // Pintar la letra en el espacio en blanco correspondiente
                                    self.pintarLetra(teclas[i].letra, j);
    
                                    // Mostrar mensaje de letra válida
                                    self.mensajeValidacion("¡Letra válida!");
                                }
                            }
                        } else {
                            // Cambiar el color del espacio en blanco
                            self.cambiarColorLetraIncorrecta();
    
                            // Mostrar mensaje de letra inválida
                            self.mensajeValidacion("¡Letra inválida!");
                        }
                    }
    
                    // Salir del bucle ya que se encontró la tecla correspondiente
                    break;
                }
            }
        });
    },
    mensajeValidacion: function (mensaje) {
        // Implementa la lógica para mostrar temporalmente el mensaje en tu juego
        console.log(mensaje);
    },
    teclaYaSeleccionada: function (letra) {   
        return this.teclasSeleccionadas.includes(letra);
    },
    cambiarColorLetraIncorrecta: function () {
        // Asegurarse de que this.coloresEspacios sea una cadena
        if (typeof this.coloresEspacios !== 'string') {
            this.coloresEspacios = ''; // O cualquier otro valor predeterminado que desees
        }
    
        // Cambiar el color de un espacio en blanco específico (por ejemplo, el primero)
        var colores = this.coloresEspacios.split("");
        colores[0] = "color_incorrecto";
        this.coloresEspacios = colores.join("");
    
        // Vuelve a dibujar los espacios en blanco en el lienzo
        this.dibujarEspacio();
    },    

    combo: function () {
        ctx.fillStyle = "#5b3104"
        ctx.fillRect(30, 475, 120, 20);
        ctx.fillRect(30, 500, 120, 20);
        ctx.fillRect(30, 525, 120, 20);

        ctx.fillStyle = "#fff";
        ctx.font = "18px 'Pixelify Sans', sans-serif";
        ctx.fillText("Categoria: ", 40, 470);
        ctx.fillText("Animales", 35, 490);
        ctx.fillText("Transporte", 35, 515);
        ctx.fillText("Edificios", 35, 540);

        lienzo.addEventListener("click", function (event) {
            var x = event.clientX - lienzo.getBoundingClientRect().left;
            var y = event.clientY - lienzo.getBoundingClientRect().top;

            if (x > 30 && x < 150 && y > 475 && y < 495) {
                juegoAhorcado.seleccionarCategoria("animales");
            } else if (x > 30 && x < 150 && y > 500 && y < 520) {
                juegoAhorcado.seleccionarCategoria("transporte");
            } else if (x > 30 && x < 150 && y > 525 && y < 545) {
                juegoAhorcado.seleccionarCategoria("edificios");
            }
        });
        this.mensajeTemporal = "Seleccione una categoría";
        this.mostrarMensajeTemporal();
        // Establecer temporizador para limpiar el mensaje después de 20 segundos
        setTimeout(function () {
            juegoAhorcado.mensajeTemporal = "";
            juegoAhorcado.mostrarMensajeTemporal();
        }, 500);
    }, 
    seleccionarCategoria: function (categoria) {
        // Selecciona una palabra aleatoria de la categoría
        var palabras = this.categorias[categoria];
        this.palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

        // Limpiar el mensaje temporal
        this.mensajeTemporal = "";

        // Dibuja los espacios en blanco en el lienzo
        this.dibujarEspacio();
        this.mostrarMensajeTemporal();
    },
    dibujarEspacio: function () {
        // Configurar el estilo del texto
        ctx.fillStyle = "#fff";
        ctx.font = "30px 'Pixelify Sans', sans-serif";
    
        // Dibujar espacios en blanco para cada letra de la palabra
        for (var i = 0; i < this.palabraSeleccionada.length; i++) {
            if (this.teclasSeleccionadas.includes(this.palabraSeleccionada[i])) {
                // Si la letra ha sido seleccionada, mostrarla en su posición
                ctx.fillText(this.palabraSeleccionada[i], 200 + i * 40, 100);
            } else {
                // Si la letra no ha sido seleccionada, mostrar un espacio en blanco
                ctx.fillText("_", 200 + i * 40, 100);
            }
        }
    },
    pintarLetra: function (letra) {
        // Verificar si la letra ya ha sido seleccionada
        if (this.teclasSeleccionadas.includes(letra)) {
            return; // La letra ya ha sido seleccionada, salir de la función
        }
        console.log("Palabra adivinar:", this.palabraSeleccionada);

        // Bloquear la tecla correspondiente
        this.teclasSeleccionadas.push(letra);
    
        // Buscar todas las ocurrencias de la letra en la palabra
        for (var i = 0; i < this.palabraSeleccionada.length; i++) {
            if (this.palabraSeleccionada[i] === letra) {
                // Dibujar la letra en cada posición correspondiente en la palabra
                ctx.fillStyle = "#fff";
                ctx.font = "30px 'Pixelify Sans', sans-serif";
                ctx.fillText(letra, 200 + i * 40, 100);
            }
        }
    }, 
    mostrarMensajeTemporal: function () {

        // Configurar el estilo del texto
        ctx.fillStyle = "#fff";
        ctx.font = "40px 'Pixelify Sans', sans-serif";

        // Mostrar el mensaje temporal
        ctx.fillText(this.mensajeTemporal, 280, 60);
    },
    escenario: function () {
        img.src = "public/img/desierto1024x576.png";
        img.onload = function () {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            juegoAhorcado.personaje();
            juegoAhorcado.teclado();
            juegoAhorcado.combo();
            juegoAhorcado.dibujarEspacio();
        }
    },
    personaje: function () {
        var personajeImg = new Image();
        personajeImg.src = "public/img/sprite_0.png";
        var x = 0;
        var y = 175;
        var ancho = 512;
        var alto = 128;
        var frame = 0;
        var tiempo = 0;
        var tiempoEntreFrames = 50; // Ajusta el tiempo entre frames en milisegundos
        function limpiarPersonaje() {
            // Borra solo el área ocupada por el personaje
            ctx.clearRect(x + 140, y, alto, alto);
        }
        function dibujarFondo() {
            limpiarPersonaje()
            ctx.drawImage(personajeImg, frame * 128, 0, 128, 128, x + 140, y, alto, alto);
        }

        function animation() {
            // Llama a la función para dibujar el fondo una vez
            dibujarFondo();
            tiempo++;
            if (tiempo >= tiempoEntreFrames) {
                tiempo = 0;
                if (frame === 3) { // Cambié de 4 a 3 para que frame vaya de 0 a 3
                    frame = 0;
                } else {
                    frame++;
                }
            }

            // Utiliza setTimeout para controlar el tiempo entre frames
            setTimeout(function () {
                window.requestAnimationFrame(animation);
            }, 1); // Ajusta el valor de 16 (aproximadamente 60 FPS) según tus necesidades
        }

        // Inicia la animación
        window.requestAnimationFrame(animation);
    },
    play: function () {
        this.escenario();
    }
}

window.onload = function () {
    juegoAhorcado.play();

}