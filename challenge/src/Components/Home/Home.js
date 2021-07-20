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
        loading:true,
        searched:'',
        currentPage:1,
        initialDate:null,
        finalDate:parseInt((new Date().getTime() / 1000).toFixed(0))
    });

/*     const [dateState, setDateState] = useState({
        initialDate:null,
        finalDate:parseInt((new Date().getTime() / 1000).toFixed(0))
    }) */

/*     useEffect(()=>{
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
 */
    //dinamic search by title
    const searchByTitle = (e) =>{
        if(e.target.value.length > 2){
            const filterRes = data.currentInfo.filter( theft => theft.title.toLowerCase().includes(e.target.value.toLowerCase()))
            setData({...data, currentInfo:filterRes, currentPage:1, searched: e.target.value})
        }
        else{
            setData({...data, currentInfo:data.allInfo, searched: e.target.value, initialDate:null})
        }
    }
    //calculate of current posts
    const postsPerPage = 10;
    const indexOfLastPost = data.currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = data.currentInfo.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setData({...data, currentPage: pageNumber});

    //set initial date
    const setInitialDate =(date) => {
        const selectedDate=parseInt((new Date(date).getTime() / 1000).toFixed(0));
        if(data.prevInfo.length===0){
            const results = data.currentInfo.filter( theft => theft.occurred_at >= selectedDate && theft.occurred_at <= data.finalDate)
            setData({...data, initialDate:selectedDate, currentInfo:results, prevInfo: data.currentInfo})
        }else{
            const results = data.prevInfo.filter( theft => theft.occurred_at >= selectedDate && theft.occurred_at <= data.finalDate)
            setData({...data, initialDate:selectedDate, currentInfo:results})
        }
            
    }
    
    // set final date, by default today
    const setFinalDate = (date) => {
        const selectedDate=parseInt((new Date(date).getTime() / 1000).toFixed(0));
        //setData({...data, finalDate:parseInt((new Date(date).getTime() / 1000).toFixed(0))})
        if(data.prevInfo.length===0){
            const results = data.currentInfo.filter( theft => theft.occurred_at <= selectedDate && theft.occurred_at >= data.initialDate)
            setData({...data, finalDate:selectedDate, currentInfo:results, prevInfo: data.currentInfo})
        }else{
            const results = data.prevInfo.filter( theft => theft.occurred_at <= selectedDate && theft.occurred_at >= data.initialDate)
            setData({...data, finalDate:selectedDate, currentInfo:results})
        }
    }

    const resetFilters = () => {
        setData({
            allInfo:datax.incidents,
            currentInfo:datax.incidents,
            prevInfo:[],
            loading:true,
            searched:'',
            currentPage:1,
            initialDate:null,
            finalDate:parseInt((new Date().getTime() / 1000).toFixed(0))    
        })
    }

    return(
        <div>
            <h1>POLICE DEPARTAMENT OF BERLIN</h1>
            <h2>Stolen bikes</h2>
            <div>
                <input placeholder='Search case description' onChange={searchByTitle} value={data.searched || ''}></input>
                <label>From:</label>
                <DatePicker 
                    selected={data.initialDate !== null ? new Date (data.initialDate * 1000) : null} 
                    onChange={setInitialDate}
                    dateFormat='dd/MM/yyyy'
                    maxDate={new Date (data.finalDate * 1000)}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Click to select a date"                     
                />
                <label>To:</label>
                <DatePicker 
                    selected={new Date (data.finalDate * 1000)} 
                    onChange={setFinalDate}
                    dateFormat='dd/MM/yyyy'
                    maxDate={new Date}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Click to select a date"                     
                />
                <button onClick={resetFilters}>Reset filters</button>
            </div>
            {
                data.currentInfo.length>0 ?
                <div>
                    <CardGenerator currentPosts={currentPosts}/>
                    <Pagination postsPerPage={postsPerPage} totalPosts={data.currentInfo.length} paginate={paginate}/>
                </div>
                :
                <h3>Results not found, try again</h3>
            }

        </div>
    )
}

export default Home;