import React, { createElement, useState, useEffect } from 'react';
import axios from 'axios';

import './Page.css';
import img  from '../images/cloud-computing.svg';

const Page = ({currentPosts}) => {
    const [loading,setLoading] = useState(false);
    const [login,setLogin] = useState(localStorage.getItem("userName"));
    const [percentage, setPercentage] = useState(0);
    const [active, setActive] = useState(null);
    const [downlaoded, setDownloaded] = useState([]);

    // form details
    const [formName,setFormName] = useState("");
    const [formEmail,setFormEmail] = useState("");
    const [formDob,setFormDob] = useState("");
    const [formPhone,setFormPhone] = useState("");

    useEffect(() =>{},[percentage,login]);


    const download = (url,author,index) => {  

        if(login != null){

            setDownloaded([...downlaoded,index]);

            var progress = 0;
            setActive(index);
            setPercentage(progress);
    
            axios.request({
                url:`https://cors-anywhere.herokuapp.com/${url}`,
                method:"GET",
                responseType: 'blob', 
                onDownloadProgress(progressEvent){
                    progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setPercentage(progress);
                }
            })
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `${author}.jpg`); 
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
        }
        else{
            document.getElementById('openModalLink').click();
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            formName,
            formEmail,
            formDob,
            formPhone
        }
        console.log(data);
        localStorage.setItem("userName",data.formName);
        localStorage.setItem("userEmail",data.formEmail);
        setLogin(localStorage.getItem("userName"));
        document.getElementById('closeLink').click();
        console.log(login);
    }

    return (
        <div>
            <div className="header">
                <div className="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Unsplash_wordmark_logo.svg" />
                </div>
                <div className="loginUser">
                    {login != null ?
                    <b>Hi {login}</b>
                    :
                    <b>Login To Download</b>
                    }
                </div>
            </div>
            <ul className="authors">
				{currentPosts.map((res,i) => (
					<li key={i}>
						<div className="author">
							<div className="authorImage">
								<img src={res.post_url+"/download"} />
							</div>
							<div className="authorName">
								<b>{res.author}</b>
							</div>
                            <div className={ downlaoded.includes(i) ?"downloadDiasabled":"download"} onClick={() => download(res.post_url+"/download",res.author,i)}>
                                <img src={img} />
                            </div>
						</div>
                        {active == i ? 
                            <p style={{width: `${percentage}%`}} className="progressBar"></p>
                            : 
                            null
                        }
					</li>
				))}
			</ul>
            <a href="#openModal" id="openModalLink">Open Modal</a>

            <div id="openModal" className="modalDialog">
                <div>	
                    <a href="#close" title="Close" className="close" id="closeLink">X</a>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <b>Name:</b> <input type="name" id="name" value={formName} onChange={(e) => setFormName(e.target.value)} className="inputs" required />
                        </label>
                        <label htmlFor="email">
                            <b>Email:</b> <input type="email" id="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="inputs" required />
                        </label>
                        <label htmlFor="date">
                            <b>DOB:</b> <input type="date" id="date" value={formDob} onChange={(e) => setFormDob(e.target.value)} name="date" className="inputs" />
                        </label>
                        <label htmlFor="phone">
                            <b>Phone:</b> <input type="tel" id="phone" 
                                name="phone" placeholder="123-456-7890" 
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                value={formPhone}
                                onChange={(e) => setFormPhone(e.target.name)}
                                className="inputs" />
                        </label>
                        <input type="submit" value="Submit" className="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Page;