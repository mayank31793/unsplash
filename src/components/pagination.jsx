import React from 'react';

import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                <li key={number} onClick={() => paginate(number)} className='page-item' style={{backgroundColor:number == currentPage? '#8989e9':null}}>
                    <span className='page-link'>
                    {number}
                    </span>
                </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Pagination;