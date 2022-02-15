import { Link } from 'react-router-dom';

import './Footer.css'
import github from '../../images/github.svg'
import linkedin from '../../images/linkedin.svg'
import angellist from '../../images/angellist.svg'


function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <p>Copyright &copy; 2022 Groove by Vladimir Radovanovic</p>
                <div className='footer-links-container'>
                    <Link
                        to={{ pathname: "https://www.linkedin.com/in/vladimir-radovanovic-476311224/" }} target="_blank">
                            <img src={linkedin} alt='linkedin acc'></img>
                    </Link>
                    <Link
                        to={{ pathname: "https://github.com/VladimirRadovanovic" }} target="_blank">
                            <img src={github} alt='github acc'></img>
                    </Link>
                    <Link
                        to={{ pathname: "https://angel.co/u/vladimir-radovanovic-2" }} target="_blank">
                            <img className='angellist' src={angellist} alt='angellist acc'></img>

                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
