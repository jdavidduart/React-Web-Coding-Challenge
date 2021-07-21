import React from "react";
import './CardGenerator.css'

function CardGenerator ({currentPosts}){

    const convertTime = (date)=>{
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const milliseconds = date * 1000;
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString('en-US', options)
        return humanDateFormat
    }

    return(
        <div className='cardContainer'>
            {
                currentPosts.map( (theft, index) => (
                    <div key={index} className='cardWrap'>
                        <div>
                            <img src={theft.media.image_url !== null ? theft.media.image_url : 'https://www.pngitem.com/pimgs/m/193-1937226_bike-png-icon-download-a-b-cycle-transparent.png'} alt='x' className='bikeImg'></img>
                        </div>
                        <div className='textContainer'>
                            <h4>{theft.title}</h4>
                            <div className='description'>{theft.description}</div>
                            <div>
                                <span className='stolen'>STOLEN: </span>
                                {    
                                    convertTime(theft.occurred_at)
                                }
                            </div>
                            <div className='locationWrap'><span className='location'>Location: </span>{theft.address}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}       

export default CardGenerator;