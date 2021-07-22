import React from 'react';
import './Header.css'

function Header (){

    return(
        <div className='headerWrap'>
            <header>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Berliner_Polizei.svg/1200px-Berliner_Polizei.svg.png' alt='x'></img>
                <div>
                <h1>POLICE DEPARTAMENT OF BERLIN</h1>
                <h2>Stolen bikes</h2>
                </div>
            </header>
        </div>
    )
}

export default Header;
