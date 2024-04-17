
import {Link} from "react-router-dom";
import styles from "../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light row justify-content-center">
            <a className="navbar-brand col-2 nav_brand" style={styles.nav_brand}>
                <svg className="svg_navbar" style={styles.svg_navbar} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.37 8.87988H17.62" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.38 8.87988L7.13 9.62988L9.38 7.37988" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12.37 15.8799H17.62" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.38 15.8799L7.13 16.6299L9.38 14.3799" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                TaskManager</a>
            <div className="col-2"></div>
            <div className="col-4">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link nav_link" className="nav_link" style={styles.nav_link}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav_link" className="nav_link" style={styles.nav_link}>Support</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav_link" className="nav_link" style={styles.nav_link}>Contact Us</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="textdecoration"  style={styles.textdecoration}>
                        <a className="nav-link nav_link" className="nav_link" style={styles.nav_link}>Login</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup"  className="textdecoration"  style={styles.textdecoration}>
                            <a className="nav-link nav_link" className="nav_link" style={styles.nav_link} href="#">Register</a>
                        </Link>
                    </li>
                    <li className="nav-item nav_menu" style={styles.nav_menu}>
                        <a className="nav-link nav_menu_bck"></a>
                    </li>
                </ul>
            </div>

        </nav>
    );
};

export default Navbar;