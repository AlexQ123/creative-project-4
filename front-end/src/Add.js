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
    
    const [selectedPlayer, setSelectedPlayer] = useState({});
    
    const [playersByScore, setPlayersByScore] = useState([]);
    
    const beginGame = () => {
        setNum1(generateRandomNumber());
        setNum2(generateRandomNumber());
        setScore(0);
        clearAnswer();
    }
    
    const checkAnswer = (event) => {
        event.preventDefault();
        
        let currentScore = score;
        
        // If the answer is correct, increment the current score.
        if (event.target[0].value !== "" && +num1 + +num2 === +event.target[0].value) {
            currentScore++;
            // If there is a player selected, and this game's score is higher than their all time high score, update their highest score.
            if (currentScore > selectedPlayer.highscore) {
                selectedPlayer.highscore = currentScore;
                updatePlayerScore(currentScore);
            }
        }
        
        // Make the next question.
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
            // console.log(response.data.players);
            
            // Every time we get the players from the server, we also want to update our leaderboard.
            updateLeaderboard(response.data.players);
        } catch(error) {
            console.log("error getting players: " + error);
        }
    }
    
    const createPlayer = async() => {
        try {
            const response = await axios.post("/api/players", {name: name, nickname: nickname, slogan: slogan});
            await getPlayers();
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
            await getPlayers();
        } catch(error) {
            console.log("error deleting player: " + error);
        }
    }
    
    const updatePlayerScore = async(score) => {
        try {
            const response = await axios.put("/api/players/" + selectedPlayer.id + "/" + score);
            await getPlayers();
        } catch(error) {
            console.log("error updating player score: " + error);
        }
    }
    
    const playerClicked = (player) => {
        setSelectedPlayer(player);
        beginGame();
    }
    
    const updateLeaderboard = (players) => {
        // Sort the players in decreasing order by their highscore.
        let sorted = [...players].sort((a, b) => b.highscore - a.highscore);
        setPlayersByScore(sorted);
        // console.log(playersByScore);
    }
    
    return (
        <div className="game-container">
        
            <div className="game-players">
                <div className="create-container">
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
                        <input type="submit" value="Create" className="check-button"/>
                    </form>
                </div>
                
                <div className="players-container">
                    <h1>Players:</h1>
                    {players.map( player => (
                        <div key={player.id} className="player">
                            <button onClick={e=>playerClicked(player)} className="select-button">Select</button>
                            {player.name} (<em>{player.nickname}</em>): "{player.slogan}"
                            <button onClick={e => deletePlayer(player)} className="delete-button">X</button>
                        </div>
                    ))}
                </div>
            </div>
            
            <hr className="separator"/>
            
            <div className="game-main">
                <h1>Add</h1>
                <button onClick={beginGame} className="begin-button">New Game</button>
                
                <h1>{num1} + {num2} = ?</h1>
                <form id="answer-form" onSubmit={e => checkAnswer(e)}>
                    <input type="text"/>
                    <button type="submit" className="check-button">Check Answer</button>
                </form>
                
                <h1 className="score">Score: {score}</h1>
            </div>
            
            <hr className="separator"/>
            
            <div className="game-leaderboard">
                <div className="">
                    <h1>Leaderboard</h1>
                    {playersByScore.map( player => (
                        <div key={player.id} className="">
                            {player.name} ({player.highscore})
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Add;