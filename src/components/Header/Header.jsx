import './Header.css';
import { NavLink } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";

const Header = () => {
    return (
        <header>
            <NavLink className="logo" to={'/'}>Kanbanika</NavLink>
            <a className='icon-link' href='https://github.com/MaksiTimur/Kanbanika' target='_blank'>
                <FaGithub className='icon' />
            </a>
        </header>
    )
}

export default Header;
