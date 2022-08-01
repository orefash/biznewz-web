import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../../config/data';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // console.log("In blog page: "+id)

  useEffect(() => {

    const getArticle = async () => {
      const articleFromServer = await fetchArticle()
      setBlog(articleFromServer)
      console.log("Blog: ", blog)
    }

    getArticle()

    // let blog = blogList.find((blog) => blog.id === parseInt(2));
    // // let blog = blogList.find((blog) => blog.id === parseInt(id));
    // if (blog) {
    //   setBlog(blog);
    // }
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
            className='continue-button'
              style={{ marginLeft: "auto" }}
            >
              Continue Reading ➝
            </button>
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;