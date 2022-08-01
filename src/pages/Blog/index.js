import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../../config/data';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import { ReactDimmer } from "react-dimmer";
import { NewsView } from '../../components/NewsView';
// import { NewsView } from '../../components/NewsView';

const Blog = () => {
  const { id } = useParams();  
  const [blog, setBlog] = useState(null);
  const [isModalOpen, setModal] = useState(false);
  // const [isMenuOpen, setMenu] = useState(false);

  const handleClick = () => {
    setModal((prevState) => !prevState);
  };

  // console.log("In blog page: "+id)

  useEffect(() => {

    const getArticle = async () => {
      const articleFromServer = await fetchArticle()
      setBlog(articleFromServer)
      // console.log("Blog: ", blog.url)
    }

    getArticle()

  }, []);

  //fetch article by id
  const fetchArticle = async () => {
    const res = await fetch(`https://biznewz-service.herokuapp.com/articles/${id}`)
    const data = await res.json()

    // console.log("Data:", data)
    if (data.status === 'OK') {
      // console.log("Data is okay:", data.data[0])
      return data.data[0]
    }


    return []
  }

  // const displayNews = async () => {
  //   console.log("in display news")
  //   // newsModal.show({ name: 'Nate' })
  //   NiceModal.show(NewsModal, { name: 'Nate' })
  // }

 

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {new Date(blog.publish_date).toDateString()}</p>
            <h1>{blog.title}</h1>
            <div className='blog-subCategory'>
              {/* {blog.subCategory.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))} */}
              <Chip label={"Source: " + blog.source} />
            </div>
          </header>
          <img src={blog.img_url} alt='cover' />
          <p className='blog-desc'>{blog.content}</p>

          <div style={{ display: "flex" }}>
            <button
            onClick={handleClick}
            className='continue-button'
              style={{ marginLeft: "auto" }}
            >
              Continue Reading ➝
            </button>
          </div>


          {isModalOpen && <NewsView closeModal={setModal} pageUrl={blog.url} />}

      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={100}
        blur={1.5}
      />


        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;