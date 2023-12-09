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
  
    validarLetra: function (letra) {
        // Verificar si la letra ya ha sido seleccionada
        if (this.teclasSeleccionadas.includes(letra)) {
            this.mostrarMensajeTemporal("¡Ya seleccionaste esa letra!");
            return;
        }
    
        // Marcar la letra como seleccionada
        this.teclasSeleccionadas.push(letra);
    
        // Verificar si la letra está en la palabra
        if (this.palabraSeleccionada.includes(letra)) {
            // Pintar la letra en los espacios en blanco
            this.pintarLetra(letra, this.encontrarPosicion(this.palabraSeleccionada, letra));
            this.mostrarMensajeTemporal("¡Letra correcta!");
        } else {
            // Cambiar el color del espacio en blanco
            this.cambiarColorLetraIncorrecta();
            this.intentosFallidos++;
            this.mostrarMensajeTemporal("¡Letra incorrecta!");
        }
    
        // Verificar si se ha completado la palabra
        if (this.palabraCompleta()) {
            this.mostrarMensajeFinal("¡Felicidades! ¡Has adivinado la palabra!");
        } else if (this.intentosFallidos >= this.maxIntentos) {
            this.mostrarMensajeFinal("¡Oh no! Has agotado todos tus intentos. La palabra era: " + this.palabraSeleccionada);
        }
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
            juegoAhorcado.validarLetra();
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
const teclasPresionadas = {};

function dibujarTeclado() {
    // ... (código del nuevo teclado)

    // Evento para manejar clic en el teclado
    lienzo.addEventListener('click', function (event) {
        const clickX = event.clientX - lienzo.getBoundingClientRect().left;
        const clickY = event.clientY - lienzo.getBoundingClientRect().top;

        // ... (código de manejo de clic del nuevo teclado)

        for (let letra = 65; letra <= 90; letra++) {
            const x = tecladoInicioX + ((letra - 65) % 8) * (teclaWidth + margenTecla);
            const y = tecladoInicioY + Math.floor((letra - 65) / 8) * (teclaHeight + margenTecla);

            if (clickX >= x && clickX <= x + teclaWidth && clickY >= y && clickY <= y + teclaHeight) {
                teclasPresionadas[String.fromCharCode(letra)] = true;
                dibujarTeclado();
                juegoAhorcado.validarLetra(String.fromCharCode(letra)); // Agrega esta línea
                break;
            }
        }

        // Verificar clic en la letra Ñ
        const letraEnyeX = tecladoInicioX + 7 * (teclaWidth + margenTecla);
        const letraEnyeY = tecladoInicioY + 2 * (teclaHeight + margenTecla);

        if (clickX >= letraEnyeX && clickX <= letraEnyeX + teclaWidth && clickY >= letraEnyeY && clickY <= letraEnyeY + teclaHeight) {
            teclasPresionadas['Ñ'] = true;
            dibujarTeclado();
            juegoAhorcado.validarLetra('Ñ'); // Agrega esta línea
        }
    });
}

window.onload = function () {
    juegoAhorcado.play();

}