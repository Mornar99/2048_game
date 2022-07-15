document.addEventListener('DOMContentLoaded',() => {
    const gridDisplay = document.querySelector('.grid')//iz dokumenta vadi elemente
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4//ja sam doli pisa samo 4
    let squares = []
    let score = 0

    function createBoard(){
        for(let i=0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square) //dodajemo square na grid
            squares.push(square)
        }
        
        //na pocetku igrica stavlja broj 2 na 2 mista
        generate()
        generate()
    }

    createBoard()

    //trazim random broj
    function generate(){
        let randomNumber = Math.floor(Math.random() * squares.length) //floor zaokruzuje broj na nizu vrijednost, random vraca broj [0,1>
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
            squares[randomNumber].style.backgroundColor = "burlywood"

            checkForLose()
        }
        else generate()
    }

    //swipe right
    function moveRight(){
        for(let i=0; i<16; i++) {
            //ako sam skroz livo, prvi stupac
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]//pribacia ove vrijednosti u niz

                //console.log(row)

                let filteredRow = row.filter(num => num > 0) //uzimam sve sta je broj i vece od nule i stavljamo u novi niz filteredRow
                //console.log(filteredRow)
                let missing = 4 - filteredRow.length 
                let zeros = Array(missing).fill(0)
                //console.log(zeros) 

                let newRow = zeros.concat(filteredRow)//spaja nizove
                //console.log(newRow)//ovako izgleda niz kad swipeRight

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
        changeColor()
    }

    //moveRight()


    //swipe left, sve isto kao swipeRight samo obrnuti concat
    function moveLeft(){
        for(let i=0; i<16; i++) {
            //ako sam skroz livo, prvi stupac
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                //console.log(row)

                let filteredRow = row.filter(num => num > 0) 
                //console.log(filteredRow)
                let missing = 4 - filteredRow.length 
                let zeros = Array(missing).fill(0)
               //console.log(zeros) 

                let newRow = filteredRow.concat(zeros)//prvo filtered pa nule
               // console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
        changeColor()
    }

    //moveLeft()


    //swipe down
    function moveDown(){
        for(let i = 0; i < 4 ; i++){//idem po stupcima, samo 4 stupca
            let totalOne = squares[i].innerHTML //npr prvi stupac: redni brojevi: 0 4 8 12
            let totalTwo = squares[i+4].innerHTML
            let totalThree = squares[i+8].innerHTML
            let totalFour = squares[i+12].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            //console.log(column)
            
            let filteredColumn = column.filter(num => num > 0)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+4].innerHTML = newColumn[1]
            squares[i+8].innerHTML = newColumn[2]
            squares[i+12].innerHTML = newColumn[3]
            
        }
        changeColor()
    }
    //moveDown()


    //swipe up, samo je concat obrnut
    function moveUp(){
        for(let i = 0; i < 4 ; i++){//idem po stupcima, samo 4 stupca
            let totalOne = squares[i].innerHTML //npr prvi stupac: redni brojevi: 0 4 8 12
            let totalTwo = squares[i+4].innerHTML
            let totalThree = squares[i+8].innerHTML
            let totalFour = squares[i+12].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            //console.log(column)
            
            let filteredColumn = column.filter(num => num > 0)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+4].innerHTML = newColumn[1]
            squares[i+8].innerHTML = newColumn[2]
            squares[i+12].innerHTML = newColumn[3]
            
        }
        changeColor()
    }


    //zbrajamo iste vrijednosti
    function combineRow() {
        for(let i =0; i < 15; i++) {//doli uvjeti da se ne zbraja zadnji iz gornjeg i prvi iz donjeg
            if(squares[i].innerHTML === squares[i+1].innerHTML && i != 3 && i != 7 && i != 11){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0

                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for(let i =0; i < 12; i++) {//do 12 jer ne ulazim u zadnji red
            if(squares[i].innerHTML === squares[i+4].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+4].innerHTML = 0

                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }


    //assigning keycodes, na strelice kontroliramo igricu
    function control(e){
        if(e.keyCode === 39){ //39 je na tipkovnici up arrow
            keyRight()
        }
        else if(e.keyCode === 37){
            keyLeft()
        }
        else if(e.keyCode === 38){
            keyUp()
        }
        else if(e.keyCode === 40){
            keyDown()
        }
    }

    document.addEventListener("keyup",control)//keyup se aktivira when key is released

    function keyRight(){//desno,zbroji sta ima, to opet desno, generiraj novu 2
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    //check for win, ako u squares imam 2048
    function checkForWin(){
        for(let i=0; i < squares.length; i++) {
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = "You win!";
                document.removeEventListener("keyup",control)//kako stisnemo koju strelicu ona gubi funkciju
            }
        }
    }

    //check for lose, ako u squares nemam nijednu 0
    function checkForLose(){
        let zeros = 0
        for(let i=0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0){
                zeros++
            }
        }

        if(zeros === 0){
            resultDisplay.innerHTML = "You lose"
            document.removeEventListener("keyup",control)
        }

    }


    //color changing
    function changeColor(){
        for(let i=0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0){
                squares[i].style.backgroundColor = "cornsilk"
            }
            else if(squares[i].innerHTML == 2){
                squares[i].style.backgroundColor = "burlywood"
            }
            else if(squares[i].innerHTML == 4){
                squares[i].style.backgroundColor = "palegoldenrod"
            }
            else if(squares[i].innerHTML == 8){
                squares[i].style.backgroundColor = "tan"
            }
            else if(squares[i].innerHTML == 16){
                squares[i].style.backgroundColor = "yellow"
            }
            else if(squares[i].innerHTML == 32){
                squares[i].style.backgroundColor = "tomato"
            }
            else if(squares[i].innerHTML == 64){
                squares[i].style.backgroundColor = "orange"
            }
            else if(squares[i].innerHTML == 128){
                squares[i].style.backgroundColor = "sandybrown"
            }
            else if(squares[i].innerHTML == 256){
                squares[i].style.backgroundColor = "saddlebrown"
            }
            else if(squares[i].innerHTML == 512){
                squares[i].style.backgroundColor = "rosybrown"
            }
            else if(squares[i].innerHTML == 1024){
                squares[i].style.backgroundColor = "slategray"
            }
            else{
                squares[i].style.backgroundColor = "black"
                squares[i].style.color = "white"
            }
               
            
        }
    }


})
//DOMContentLoaded se pali kad se ucita stranica, netriba cekat click ili mouseover