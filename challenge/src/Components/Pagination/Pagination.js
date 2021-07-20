import React, {useEffect, useState} from 'react';
import './Pagination.css'

function Pagination({postsPerPage, totalPosts, paginate}){
    const pageNumbers = [];
    const [activeIndex, setActiveIndex] = useState(0);
    
    useEffect(()=>{
        setActiveIndex(0)
    },[totalPosts])
    
    //calculate of quantity of pages
    for (let i = 1; i <= Math.ceil(totalPosts/[postsPerPage]); i++) {
        pageNumbers.push(i);
    }

    const handleOnClick = (index, number) => {
        setActiveIndex(index); 
        paginate(number)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };

    //render pages
    return(
        <div className='pagination'>
            {
                pageNumbers.map((number, index) =>(         
                    <span className={activeIndex === index ? 'active' : 'unActive'} key={number} onClick={() =>handleOnClick(index, number)}>{number}</span>
                ))
            }
        </div>
    )
}

export default Pagination;