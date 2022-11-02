import brain from './brain.png';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className="home-container">
                <div className="home-pic">
                    <img src={ brain } className="brain-pic"/>
                </div>
                <div className="home-text">
                    <p>
                        Welcome to Alex's Math Games! If you want to exercise your brain and have some fun in the process, then you're in the right place. These brain workouts are 
                        free -- that's right, you don't have to pay a membership fee or anything!
                        <br></br>
                        <br></br>
                        You can practice addition and subtraction to sharpen your math skills. Set a timer and see how many you can solve during that time! You can also compete with 
                        your friends to see who will be crowned the king of the Math Games. Good luck and have fun!
                    </p>
                </div>
            </div>
        </div>
    );
}