import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import Page from './components/page';
import Pagination from './components/pagination';

function App() {

	const [imagesData,setData] = useState([]);
	const [currentPage,setCurrentPage] = useState(1);
	const [postsPerPage,setPostsPerPage] = useState(16);
	const [search,setSearch] = useState('');
	const [loading,setLoading] = useState(false);

	useEffect(() => {
		axios.get('https://cors-anywhere.herokuapp.com/https://picsum.photos/list').then((res) => setData(res.data));
	},[]);

	const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = imagesData.slice(indexOfFirstPost,indexOfLastPost);
	
	const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

	return (
		<div className="App">
			<Page currentPosts={currentPosts} />
			<Pagination 
				postsPerPage={postsPerPage}
				totalPosts={imagesData.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
}

export default App;
