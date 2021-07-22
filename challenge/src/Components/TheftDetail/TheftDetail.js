import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Loading from '../Loading/Loading';
import './TheftDetail.css'


function TheftDetail ({match}){
    const [theft, setTheft] = useState([])
    const id=match.params.id;
    useEffect(()=>{
        const getData = async function(){
            try {
                const results = await axios.get(`https://bikewise.org/api/v2/incidents/${id}`)
                setTheft(results.data.incident)
            } catch (error) {
                console.log(error)
            }
        }
        getData();

    },[id])

    const convertTime = (date)=>{
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const milliseconds = date * 1000;
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString('en-US', options)
        return humanDateFormat
    }


    if(theft.length===0) return <Loading/>
    else{
        return(
            <div className='detailContainer'>
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
        )
    }
}

export default TheftDetail;