import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams();
    const history = useNavigate(); // Use history for redirects
    const [post, setPost] = useState({ id: null, title: "", author: "", description: "" });

    useEffect(() => {
        // Fetch post data when the component mounts
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault(); // Prevent form submission

        const { error } = await supabase
            .from('Posts')
            .update({ title: post.title, author: post.author, description: post.description })
            .eq('id', id);

        if (!error) {
            history("/"); // Use navigate to redirect after successful update
        } else {
            console.error('Error updating post:', error);
        }
    };

    const deletePost = async () => {
        const { error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        if (!error) {
            history("/"); // Use navigate to redirect after successful deletion
        } else {
            console.error('Error deleting post:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <form onSubmit={updatePost}>
            <label htmlFor="title">New Title: </label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Meal Type: </label><br />
                <select type="text" id="description" name="description" value={post.description} onChange={handleChange}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select><br />
                <br/>

                <label htmlFor="author">Change recipe: </label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange}/><br/>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
            </form>
            <button className="deleteButton" onClick={deletePost}>Delete</button>
        </div>
    );
};

export default EditPost;
