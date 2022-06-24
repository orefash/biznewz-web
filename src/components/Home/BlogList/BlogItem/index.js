
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    content,
    img_url,
    publish_date,
    source,
    title,
    url,
    id,
  },
}) => {
  return (
    <div className='blogItem-wrap'>
      <img 
      className='blogItem-cover' 
      src={img_url.length> 0 ? img_url : "/assets/images/nmg.jpg"} 
      alt='cover'
      />
      <Chip label={source} />
      <h3>{title}</h3>
      <p className='blogItem-desc'>{content}</p>
      <footer>
        <div className='blogItem-author'>
          <img src='/assets/images/norange.png' alt='avatar' />
          <div>
            <h6>{new Date(publish_date).toDateString()}</h6>
            {/* <p>{createdAt}</p> */}
          </div>
        </div>
        <Link className='blogItem-link' to={`/blog/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;