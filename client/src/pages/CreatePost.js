import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", author: "", description: "" });

    const createPost = async (event) => {
        event.preventDefault();
    
        await supabase
          .from('Posts')
          .insert({ title: post.title, author: post.author, description: post.description })
          .select();
    
        window.location = "/";
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Meal type: </label><br />
                <select type="text" id="description" name='description' value={post.description} onChange={handleChange}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                <br/>

                <label htmlFor="author">Recipe: </label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit"  />
            </form>
        </div>
    );
};

export default CreatePost;
