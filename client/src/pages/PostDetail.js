import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './Postdetail.css';
import { Link } from 'react-router-dom';
import Card from '../components/Card.js';


const DetPosts = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const { id } = useParams();  // Retrieve the 'id' from the URL
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');



    useEffect(() => {
        async function fetchPost() {
            // Fetch the post using the id from the URL parameter
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
                return;
            }

            setSelectedCard(data);  // Set the retrieved post to state
            setLikes(data.likes || 0);
        }

        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
          const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id); // Ensure you are matching the post ID
      
          if (error) {
            console.error('Error fetching comments:', error);
          } else {
            setComments(data);
          }
        };
      
        if (selectedCard) {
          fetchComments();
        }
      }, [id, selectedCard]); // Fetch comments when selectedCard is loaded
      
    // Conditional rendering to handle loading and error state
    if (!selectedCard) {
        return <div className="DetPosts"><h2>Loading or no data found...</h2></div>;
    }
    const incrementLikes = async () => {
        const newLikes = likes + 1;
        const { data, error } = await supabase
            .from('Posts')
            .update({ likes: newLikes })
            .eq('id', id);
    
        if (!error) {
            setLikes(newLikes);  // Update likes state
        } else {
            console.error('Error updating likes:', error);
        }
    };
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              post_id: id,
              content: newComment,
              // If you have user authentication, you can add an author_id here
            },
          ]);
      
        if (error) {
          console.error('Error submitting comment:', error);
        } else {
          setComments([...comments, data[0]]);
          setNewComment(''); // Reset the form
        }
      };
    

    return (
        <div className="DetPosts">
            <div>
                <h1>{selectedCard.title}</h1>  
                <p>Meal Type:  {selectedCard.description}</p>
                <p>Recipe:  {selectedCard.author}</p>
                <Link to="/"><button className="headerBtn"> Back to Home</button></Link>
                <Link to={`/edit/${selectedCard.id}`}><button>Edit or Delete</button></Link>
                <button class="likeButton" onClick={incrementLikes}>Like {likes}</button>
            </div>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    required
                    />
                <button type="submit" >Submit Comment</button>
            </form>

            <div className="comments-section">
                {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <p>{comment.created_at}</p>
                    <p>{comment.content}</p>
                    
                </div>
                
    
             ))}
            </div>
        </div>
    );
};

export default DetPosts;
