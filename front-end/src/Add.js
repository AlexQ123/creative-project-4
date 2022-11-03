import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import './Games.css'; 

function Add() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [score, setScore] = useState(0);
    const [players, setPlayers] = useState([]);
    
    const beginGame = () => {
        setNum1(generateRandomNumber());
        setNum2(generateRandomNumber());
        clearAnswer();
    }
    
    const checkAnswer = (event) => {
        event.preventDefault();
        
        let currentScore = score;
        
        if (event.target[0].value !== "" && +num1 + +num2 === +event.target[0].value) {
            currentScore++;
        }
        
        setNum1(generateRandomNumber());
        setNum2(generateRandomNumber());
        setScore(currentScore);
        clearAnswer();
    }
    
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 10) + 1;
    }
    
    const clearAnswer = () => {
        document.getElementById("answer-form").reset();
    }
    
    return (
        <div className="game-container">
            <div className="game-players">
                Players
            </div>
            
            <div className="game-main">
                <h1>Add</h1>
                <button onClick={beginGame} className="begin-button">Begin!</button>
                
                <h1>{num1} + {num2} = ?</h1>
                <form id="answer-form" onSubmit={e => checkAnswer(e)}>
                    <input type="text"/>
                    <button type="submit" className="check-button">Check Answer</button>
                </form>
                
                <h1 className="score">Score: {score}</h1>
            </div>
            
            <div className="game-highscore">
                High Score
            </div>
        </div>
    );
}

// class Add extends Component {
//     constructor(props) {
//         super(props);
        
//         this.state = {
//             num1: 0,
//             num2: 0,
//             score: 0,
//             players: []
//         }
        
//         this.updateState = this.updateState.bind(this);
//         this.beginGame = this.beginGame.bind(this);
//         this.checkAnswer = this.checkAnswer.bind(this);
//     }
    
//     updateState(newNum1, newNum2, newScore) {
//         this.setState({ num1: newNum1, num2: newNum2, score: newScore });
//     }
    
//     beginGame() {
//         this.updateState(this.generateRandomNumber(), this.generateRandomNumber(), 0);
//         this.clearAnswer();  
//     }
    
//     checkAnswer(event) {
//         event.preventDefault();
        
//         let currentScore = this.state.score;
        
//         if (event.target[0].value !== "" && +this.state.num1 + +this.state.num2 === +event.target[0].value) {
//             currentScore++;
//         }
        
//         this.updateState(this.generateRandomNumber(), this.generateRandomNumber(), currentScore);
//         this.clearAnswer();
//     }
    
//     generateRandomNumber() {
//         return Math.floor(Math.random() * 10) + 1;
//     }
    
//     clearAnswer() {
//         document.getElementById("answer-form").reset();
//     }
    
//     render() {
//         return (
//             <div className="game-container">
//                 <div className="game-players">
//                     Players
//                 </div>
                
//                 <div className="game-main">
//                     <h1>Add</h1>
//                     <button onClick={this.beginGame} className="begin-button">Begin!</button>
                    
//                     <h1>{this.state.num1} + {this.state.num2} = ?</h1>
//                     <form id="answer-form" onSubmit={this.checkAnswer}>
//                         <input type="text"/>
//                         <button type="submit" className="check-button">Check Answer</button>
//                     </form>
                    
//                     <h1 className="score">Score: {this.state.score}</h1>
//                 </div>
                
//                 <div className="game-highscore">
//                     High Score
//                 </div>
//             </div>
//         );
//     }
// }

export default Add;