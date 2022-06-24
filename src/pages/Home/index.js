import { useEffect, useState } from "react"
import EmptyList from "../../components/common/EmptyList"
import BlogList from "../../components/Home/BlogList"
import Footer from "../../components/Home/Footer"
import Header from "../../components/Home/Header"
import SearchBar from "../../components/Home/SearchBar"
import { blogList } from "../../config/data"


const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        const getArticles = async () => {
            const articlesFromServer = await fetchArticles()
            setBlogs(articlesFromServer)
        }

        getArticles()
    }, [])

    //fetch tasks
    const fetchArticles = async () => {
        const res = await fetch('https://biznewz-service.herokuapp.com/articles')
        const data = await res.json()

        // console.log("Data:", data)
        if(data.status === 'OK'){
            // console.log("Data is okay:", data.data)
            return data.data
        }
            

        return []
    }


    // Search submit
    const handleSearchBar = (e) => {
        e.preventDefault();
        console.log("handling search")
        handleSearchResults();
    };

    // Search for blog by category
    const handleSearchResults = () => {
        const allBlogs = blogs;
        console.log("In search: ", searchKey)
        const filteredBlogs = allBlogs.filter((blog) =>
            blog.source.toLowerCase().includes(searchKey.toLowerCase().trim())
        );
        setBlogs(filteredBlogs);
    };

    // Clear search and show all blogs
    const handleClearSearch = () => {
        setBlogs(blogs);
        setSearchKey('');
    };

    return (

        <div>
            <Header />

            {/* <SearchBar
                value={searchKey}
                clearSearch={handleClearSearch}
                formSubmit={handleSearchBar}
                handleSearchKey={(e) => setSearchKey(e.target.value)}
            /> */}

            {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}

            <Footer />
        </div>

    )
}

export default Home