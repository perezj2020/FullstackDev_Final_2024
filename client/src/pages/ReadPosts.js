import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState('likes'); 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let query = supabase.from('Posts').select('*');

            if (sortType === 'likes') {
                query = query.order('likes', { ascending: false });
            } else if (sortType === 'created_at') {
                query = query.order('created_at', { ascending: false });
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching posts:', error);
                return;
            }
            setPosts(data);
        };

        fetchPosts();
    }, [sortType]);  // Re-fetch posts when sortType changes
    const handleSearch = async () => {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .ilike('title', `%${searchTerm}%`); // Case-insensitive search in the 'title' column
      
        if (error) {
          console.error('Error searching posts:', error);
        } else {
          // Update the state with the search result, or handle it as needed
          console.log(data);
          setSearchResults(data);
        }
      };
      

    return (
        
        <div className="sort-buttons-container">
    <button className="sort-button" onClick={() => setSortType('likes')}>Sort by Likes</button>
    <button className="sort-button" onClick={() => setSortType('created_at')}>Sort by Date</button>
    <div className="ReadPosts">
    {
            posts && posts.length > 0 ?
            posts.map((post,index) => 
                <Card created_at={post.created_at} id={post.id} title={post.title} author={post.author} description={post.description}/>
            ) : <h2>{'No Food?'}</h2>
                }
        </div> 
        <div>
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
  </div>
  <div>
  {searchResults.map((post) => (
    <div class="Card" key={post.id}>{post.title}
        <div class="content-container">
    <Link to={`/posts/${post.id}`}>
        <button className="headerBtn">More Info</button>
      </Link> </div>
    
    </div>
    
  ))}
</div>


        </div>
    )
}

export default ReadPosts;


