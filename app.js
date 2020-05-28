document.addEventListener('DOMContentLoaded', () => { //Esperará a que cargue el contenido del DOM para ejecutar lo que hay entre llaves
    const grid = document.querySelector('.grid'); //Adjudica a la constante el valor del selector 
    let squares = Array.from(document.querySelectorAll('.grid div')); //Crea un Array con los nodos que cumplan ambos selectores
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10; //EL valor es 10 porque el ancho del contenedor puede contener 10 divs
    let nextRandom = 0;
    let timerId
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    //The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4; //La posicion es 4 para colocarlo en el centro
    let currentRotation = 0; //La rotación inicial siempre será 0 para rotarla después


    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length); //Genera un número aleatorio entre 0 y 4, redondeando hacia abajo.
    let current = theTetrominoes[random][currentRotation]; //

    //draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino') //Añade la clase .tetromino pintando el div de azul
            squares[currentPosition + index].style.backgroundColor = colors[random] //Aplica el estilo del color asignado al tetromino random
        })
    }
    
    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino') //Elimina la clase .tetromino
            squares[currentPosition + index].style.backgroundColor = '' //Aplica el estilo vacío para eliminar el que le correspondía 
        })
    }

    //make the tetromino move down every second
    // timerId = setInterval(moveDown, 1000)

    //assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    //move down funtcion
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromminoes falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameover()
        }
    }

    //move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw()
        const isALeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isALeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    //move the tetromino rigth, unless is at the edge or there is a blockage
    function moveRight() {
        undraw()
        const isARightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if (!isARightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    //rotate the tetromino
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) { //si el current rotation llega a 4, hace que lo ponga a 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //show up-next tetromino in mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0


    //the tetrominoes without rotations
    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
    ]

    //display the shape in the mini-grid display
    function displayShape() {
        //remove any trace of a tetromino form the entire grid
        displaySquares.forEach(squares => {
            squares.classList.remove('tetromino')
            squares.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
            
        })
    }

    //add functionality to the button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })

    //add score
    function addScore() {
        for (let i = 0; i < 199; i +=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''

                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }

        }
    }

    //game over
    function gameover () {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) { //Evalua si los indices que componen un nuevo tetromino se dibuja en una celda ya ocupada, en ese caso es true
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId) //Finaliza el intervalo, se para el juego
        }
    }








})