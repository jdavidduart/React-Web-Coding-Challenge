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
                        <img src={theft.media.image_url !== null ? theft.media.image_url : 'https://www.pngitem.com/pimgs/m/193-1937226_bike-png-icon-download-a-b-cycle-transparent.png'} alt='x' className='bikeImg'></img>
                        <div>
                            <h4>{theft.title}</h4>
                            <p>{theft.description}</p>
                            <div>
                                <span>Date: </span>
                                {    
                                    convertTime(theft.occurred_at)
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}       

export default CardGenerator;