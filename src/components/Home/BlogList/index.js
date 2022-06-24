import { useState } from "react"
import { Pagination } from "react-pagination-bar"

import BlogItem from './BlogItem';
import './styles.css';
import 'react-pagination-bar/dist/index.css'


const BlogList = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pagePostsLimit = 12;

  return (
    <div>

      <div className='blogList-wrap'>
        {blogs
        .slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
        .map((blog) => (
          <BlogItem blog={blog} key={blog.id} />
        ))}


        
      </div>

<div className='pagination-block'>
<Pagination
        initialPage={currentPage}
        itemsPerPage={pagePostsLimit}
        onPageСhange={(pageNumber) => setCurrentPage(pageNumber)}
        totalItems={blogs.length}
        pageNeighbours={2}
        customClassNames={{
          rpbItemClassName:'custom-item',
          rpbItemClassNameActive:'custom-item--active'
        }}
      />
</div>


    </div>

  );
};

export default BlogList;