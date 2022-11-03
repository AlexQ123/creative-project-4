import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/">Home</Link>
            <ul>
                <li><Link to="/add">Add</Link></li>
                <li><Link to="/subtract">Subtract</Link></li>
                <li><Link to="/multiply">Multiply</Link></li>
            </ul>
        </nav>
    );
}