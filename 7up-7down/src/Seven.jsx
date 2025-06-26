import img1 from "./assets/d1.jpg"
import img2 from "./assets/d2.jpg"
import img3 from "./assets/d3.jpg"
import img4 from "./assets/d4.jpg"
import img5 from "./assets/d5.jpg"
import img6 from "./assets/d6.jpg"
import diceSound from "./assets/dice.mp3"
import winSound from "./assets/win.mp3"

function Seven() {
    let selectedChoice = ""

    function chooseSevenUp() {
        selectedChoice = "seven_up"
        document.getElementsByClassName('seven-up')[0].style.display = "block"
        document.getElementsByClassName('seven')[0].style.display = "none"
        document.getElementsByClassName('seven-down')[0].style.display = "none"
    }

    function chooseSeven() {
        selectedChoice = "seven"
        document.getElementsByClassName('seven-up')[0].style.display = "none"
        document.getElementsByClassName('seven')[0].style.display = "block"
        document.getElementsByClassName('seven-down')[0].style.display = "none"
    }

    function chooseSevenDown() {
        selectedChoice = "seven_down"
        document.getElementsByClassName('seven-up')[0].style.display = "none"
        document.getElementsByClassName('seven')[0].style.display = "none"
        document.getElementsByClassName('seven-down')[0].style.display = "block"
    }

    function playDiceSound() {
        let audio = document.getElementById("dice-audio")
        audio.play()
    }

    function playWinSound() {
        let audio = new Audio("./assets/win.mp3")
        audio.play()
    }

    let diceValues = [1, 2, 3, 4, 5, 6]
    let totalBalance = 0

    function rollDice() {
        let diceImages = [img1, img2, img3, img4, img5, img6]
        playDiceSound()

        let betAmount = document.getElementById('inp').value
        let firstDieIndex = Math.floor(Math.random() * 6)
        let secondDieIndex = Math.floor(Math.random() * 6)

        let firstDieImage = document.getElementsByClassName('img1')[0]
        let secondDieImage = document.getElementsByClassName('img2')[0]

        // Add animation class
        firstDieImage.classList.add('rolling')
        secondDieImage.classList.add('rolling')

        // Set new images
        firstDieImage.setAttribute('src', diceImages[firstDieIndex])
        secondDieImage.setAttribute('src', diceImages[secondDieIndex])

        // Remove animation after it ends
        setTimeout(() => {
            firstDieImage.classList.remove('rolling')
            secondDieImage.classList.remove('rolling')
        }, 600)

        const diceSum = diceValues[firstDieIndex] + diceValues[secondDieIndex]

        if (diceSum > 7 && selectedChoice === "seven_up") {
            playWinSound()
            document.getElementById('h1').innerHTML = `You won! Balance: ${totalBalance + (betAmount * 2)}`
            document.getElementsByClassName('seven')[0].style.display = 'block'
            document.getElementsByClassName('seven-down')[0].style.display = 'block'
        } else if (diceSum < 7 && selectedChoice === "seven_down") {
            playWinSound()
            document.getElementById('h1').innerHTML = `You won! Balance: ${totalBalance + (betAmount * 2)}`
            document.getElementsByClassName('seven-up')[0].style.display = 'block'
            document.getElementsByClassName('seven')[0].style.display = 'block'
        } else if (diceSum === 7 && selectedChoice === "seven") {
            playWinSound()
            document.getElementById('h1').innerHTML = `You won! Balance: ${totalBalance + (betAmount * 3)}`
            document.getElementsByClassName('seven-up')[0].style.display = 'block'
            document.getElementsByClassName('seven-down')[0].style.display = 'block'
        } else {
            document.getElementById('h1').innerHTML = `You lost! Balance: ${totalBalance - betAmount}`
            playWinSound()
        }
    }

    return (
        <>
            <h2>7-UP & 7-Down</h2>
            <div className="main">
                <div className="choices">
                    <div className="seven-up" onClick={chooseSevenUp}>
                        7-Up
                    </div>
                    <div className="seven" onClick={chooseSeven}>
                        7
                    </div>
                    <div className="seven-down" onClick={chooseSevenDown}>
                        7-Down
                    </div>
                </div>
            </div>
            <div className="btn">
                <input type="text" id="inp" />
                <button onClick={rollDice} className="b">Submit</button>
                <div className="imgs">
                    <img src="" alt="" className="img1" />
                    <img src="" alt="" className="img2" />
                </div>
            </div>
            <h1 id="h1"></h1>
            <audio id="dice-audio" src={diceSound}></audio>
            <audio id="" src={winSound}></audio>
        </>
    )
}

export default Seven;
