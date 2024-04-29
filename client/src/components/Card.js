import { supabase } from '../client';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Card = (props) => {
  // Displaying the creation date. Assuming `created_at` is in ISO 8601 format and passed as a prop.
  const [likes, setLikes] = useState(props.likes || 0); // Initialize likes from props

  const formatDate = (dateString) => {
    if (!dateString) return 'No date provided';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  const [count, setCount] = useState(0);  // State to track the count of clicks

  const incrementLikes = async (postId) => {
    try {
      // Step 1: Fetch the current number of likes
      const { data: currentData, error: fetchError } = await supabase
        .from('Posts')
        .select('likes')
        .eq('id', postId)
        .single();
  
      if (fetchError) throw fetchError;
  
      // Step 2: Increment the likes count
      const newLikes = (currentData.likes || 0) + 1;
  
      // Step 3: Update the post with the new likes count
      const { data, error } = await supabase
        .from('Posts')
        .update({ likes: newLikes })
        .match({ id: postId });
  
      if (error) throw error;
  
      return newLikes;  // Return the updated likes count
    } catch (error) {
      console.error('Error updating likes:', error);
      return null;  // Return null in case of error
    }
  };
  
  const handleLike = async () => {
    const newLikes = await incrementLikes(props.id);
    if (newLikes !== null) {
      setLikes(newLikes);
      setCount(count + 1);  // Update local state if the database update was successful
    }
  };
  

  return (
    <div className="Card">
      <Link to={'edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <p className="timestamp">Created: {formatDate(props.created_at)}</p>
      <h2 className="title">{props.title}</h2>
      <p className="description">{"Meal Type: " + props.description}</p>
      <Link to={`/posts/${props.id}`}>
        <button className="headerBtn">Recipe</button>
      </Link>
      <button className="likeButton" onClick={handleLike}>
        Like {likes}  
      </button>
    </div>
  );
};

export default Card;
