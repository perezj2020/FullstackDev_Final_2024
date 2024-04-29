import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import HomePage from './pages/Homepage';
import PostDetail from './pages/PostDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

  const posts = [
      
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/Home",
      element: <HomePage />
    },{
      path:"/posts/:id",
      element: <PostDetail data={posts} />
    }
  ]);

  return ( 
  <div className="App">
  

      <div className="header">
        <h1>UnderGround Recipes!</h1>
        
        <h2>Create and share your craziest foods!</h2>
        <Link to="/"><button className="headerBtn"> Home </button></Link>
        <Link to="/new"><button className="headerBtn"> New Recipe? </button></Link>
        
      </div>
        {element}
    </div>

  );
}

export default App;
