// import React, {Component} from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Add() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [score, setScore] = useState(0);
    
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [slogan, setSlogan] = useState("");
    
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
    
    useEffect(() => {
        getPlayers();
    },[]);
    
    const getPlayers = async() => {
        try {      
            const response = await axios.get("/api/players");
            setPlayers(response.data.players);
            console.log(response.data.players);
        } catch(error) {
            console.log("error getting players: " + error);
        }
    }
    
    const createPlayer = async() => {
        try {
            const response = await axios.post("/api/players", {name: name, nickname: nickname, slogan: slogan});
            getPlayers();
            console.log(response.data.player);
            
            setName("");
            setNickname("");
            setSlogan("");
        } catch(error) {
            console.log("error adding player: " + error);
        }
    }
    
    const deletePlayer = async(player) => {
        try {
            await axios.delete("/api/players/" + player.id);
            getPlayers();
        } catch(error) {
            console.log("error deleting player: " + error);
        }
    }
    
    return (
        <div className="game-container">
            <div className="game-players">
                <h1>Players</h1>
                {players.map( player => (
                    <div key={player.id} className="player">
                        
                        <button onClick={e => deletePlayer(player)}>Delete</button>
                    </div>
                ))}
                
                <h1>Create a player:</h1>
                <form onSubmit={createPlayer}>
                    <div>
                        <label>
                            Username:
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Nickname:
                            <input type="text" value={nickname} onChange={e=>setNickname(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Slogan:
                            <input type="text" value={slogan} onChange={e=>setSlogan(e.target.value)} />
                        </label>
                    </div>
                    <input type="submit" value="Create" />
                </form>
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