import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import datax from '../info';    //in case api is down
import CardGenerator from '../CardGenerator/CardGenerator';
import './Home.css'

function Home (){
    const baseUrl='https://bikewise.org:443/api/v2/incidents?page=1&per_page=100&incident_type=theft&proximity=berlin&proximity_square=200';
    const [data, setData] = useState({
        allInfo:[],
        currentInfo:[],
        prevInfo:[],
        loading:true,
        searched:'',
        currentPage:1,
        activeIndex:0,
        initialDate:null,
        finalDate:parseInt((new Date().getTime() / 1000).toFixed(0))

    });
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(()=>{
        const getData = async function(){
            try {
                const results = await axios.get(baseUrl)
                setData((data)=>({...data, allInfo: results.data.incidents, currentInfo: results.data.incidents, loading:false}))
            } catch (error) {
                setData((data)=>({...data, allInfo: datax.incidents, currentInfo: datax.incidents, loading:false}))
                console.log(error)
            }
        }
        getData();

    },[])

    //dinamic search by title
    const searchByTitle = (e) =>{
        const filterRes = data.allInfo.filter( theft => theft.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setData({...data, currentInfo:filterRes, currentPage:1, searched: e.target.value, prevInfo:data.currentInfo})

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
            setData({...data, initialDate:selectedDate, currentInfo:results, prevInfo: data.currentInfo, currentPage:1})
        }else{
            const results = data.prevInfo.filter( theft => theft.occurred_at >= selectedDate && theft.occurred_at <= data.finalDate)
            setData({...data, initialDate:selectedDate, currentInfo:results, currentPage:1})
        }
            
    }
    
    // set final date, by default today
    const setFinalDate = (date) => {
        const selectedDate=parseInt((new Date(date).getTime() / 1000).toFixed(0));
        //setData({...data, finalDate:parseInt((new Date(date).getTime() / 1000).toFixed(0))})
        if(data.prevInfo.length===0){
            const results = data.currentInfo.filter( theft => theft.occurred_at <= selectedDate && theft.occurred_at >= data.initialDate)
            setData({...data, finalDate:selectedDate, currentInfo:results, prevInfo: data.currentInfo, currentPage:1})
        }else{
            const results = data.prevInfo.filter( theft => theft.occurred_at <= selectedDate && theft.occurred_at >= data.initialDate)
            setData({...data, finalDate:selectedDate, currentInfo:results,currentPage:1})
        }
    }

    const resetFilters = () => {
        setData({
            allInfo:data.allInfo,
            currentInfo:data.allInfo,
            prevInfo:[],
            loading:true,
            searched:'',
            currentPage:1,
            initialDate:null,
            finalDate:parseInt((new Date().getTime() / 1000).toFixed(0))    
        })
        setActiveIndex(0)
    }

    return(
        <div className='homeContainer'>
            <div className='filterContainer'>
                <input placeholder='Search case description' onChange={searchByTitle} value={data.searched || ''} data-testid='searchInput'></input>
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
                    maxDate={new Date ()}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Click to select a date"                     
                />
                <button onClick={resetFilters} className='resetBtn' data-testid='resetBtn'>Reset filters</button>
            </div>
            {
                data.loading === true && data.currentInfo.length === 0? <Loading/> : 
                <div>
                    <CardGenerator currentPosts={currentPosts}/>
                    <Pagination postsPerPage={postsPerPage} totalPosts={data.currentInfo.length} paginate={paginate} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </div>
            }

        </div>
    )
}

export default Home;