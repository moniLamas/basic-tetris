document.addEventListener('DOMContentLoaded', () => { //Esperará a que cargue el contenido del DOM para ejecutar lo que hay entre llaves
    const grid = document.querySelector('.grid'); //Adjudica a la constante el valor del selector 
    let squares = Array.from(document.querySelectorAll('.grid div')); //Crea un Array con los nodos que cumplan ambos selectores
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10; //EL valor es 10 porque el ancho del contenedor puede contener 10 divs

    //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ];

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ];

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ];

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
  let currentPosition = 4; //La posicion es 4 para colocarlo en el centro
  let currentRotation = 0; //La rotación inicial siempre será 0 para rotarla después

  
  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length);//Genera un número aleatorio entre 0 y 4, redondeando hacia abajo.
  let current = theTetrominoes [random] [currentRotation]; //

  //draw the Tetromino
  function draw() {
      current.forEach(index => {
          squares[currentPosition + index].classList.add('tetromino') //Añade la clase .tetromino pintando el div de azul
      })
  }
  
  //undraw the Tetromino
  function undraw() {
      current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino')//Elimina la clase .tetromino
      })
  }




  
  
  


})