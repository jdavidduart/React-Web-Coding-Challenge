import React, {useEffect} from 'react';
import './Pagination.css'

function Pagination({postsPerPage, totalPosts, paginate, activeIndex, setActiveIndex}){
    const pageNumbers = [];
    
    
    useEffect(()=>{
        setActiveIndex(0)
    },[totalPosts, setActiveIndex])
    
    //calculate of quantity of pages
    for (let i = 1; i <= Math.ceil(totalPosts/[postsPerPage]); i++) {
        pageNumbers.push(i);
    }

    const handleOnClick = (index, number) => {
        setActiveIndex(index)
        paginate(number)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };

    
    const upCount = ()=>{
        if(activeIndex+1<pageNumbers.length){
            setActiveIndex(activeIndex + 1)
            paginate(activeIndex + 2)
        }
    }

    const downCount = ()=>{
        if(activeIndex>0){
            setActiveIndex(activeIndex - 1)
            if(activeIndex - 1 !== 0){
                paginate(activeIndex - 1)
            }else{paginate(activeIndex)}
        }
    }

    //render pages
    return(
        <div className='pagination'>
            {
                pageNumbers.length === 0? 
                <h3>Results not found, try again</h3>
                :
                <div>
                <span onClick={downCount}>Prev</span>
                {
                    pageNumbers.map((number, index) =>(         
                        <span className={activeIndex === index ? 'active' : 'unActive'} key={number} onClick={() =>handleOnClick(index, number)}>{number}</span>
                    ))
                }
                <span onClick={upCount}>Next</span>
            </div>
                        
            }
        </div>
    )
}

export default Pagination;