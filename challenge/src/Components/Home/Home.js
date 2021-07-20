import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import datax from '../info';
import CardGenerator from '../CardGenerator/CardGenerator';


function Home (){
    const baseUrl='https://bikewise.org:443/api/v2/incidents?page=1&per_page=100&incident_type=theft&proximity=berlin&proximity_square=200';
    const [data, setData] = useState({
        allInfo:datax.incidents,
        currentInfo:datax.incidents,
        prevInfo:[],
        loading:true
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [dateState, setDateState] = useState({
        initialDate:null,
        finalDate:parseInt((new Date().getTime() / 1000).toFixed(0))
    })

    useEffect(()=>{
        const getData = async function(){
            try {
                const results = await axios.get(baseUrl)
                setData({...data, allInfo: results.data.incidents, loading:false})
            } catch (error) {
                console.error(error)
            }
        }
        getData();

    },[])


    //calculate of current posts
    const postsPerPage = 10;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = data.currentInfo.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    return(
        <div>
            <h1>POLICE DEPARTAMENT OF BERLIN</h1>
            <h2>Stolen bikes</h2>
            <div>
                <input placeholder='Search case description'></input>
                <label>From:</label>
                <DatePicker 
                    selected={dateState.initialDate !== null ? new Date (dateState.initialDate * 1000) : null} 
                    onChange={(date) => setDateState({...dateState, initialDate:parseInt((new Date(date).getTime() / 1000).toFixed(0))})}
                    dateFormat='dd/MM/yyyy'
                    maxDate={new Date}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Click to select a date"                     
                />
                <label>To:</label>
                <DatePicker 
                    selected={new Date (dateState.finalDate * 1000)} 
                    onChange={(date) => setDateState({...dateState, finalDate:parseInt((new Date(date).getTime() / 1000).toFixed(0))})}
                    dateFormat='dd/MM/yyyy'
                    maxDate={new Date}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Click to select a date"                     
                />
            </div>
{/*             {
                data.loading === true ? <Loading/> : null
            } */}
            <CardGenerator currentPosts={currentPosts}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={data.currentInfo.length} paginate={paginate}/>
        </div>
    )
}

export default Home;