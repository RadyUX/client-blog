
import Category from '../components/Category';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  like_count: number;
  // Add other properties if necessary
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const category = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/posts${category}`);
        setPosts(res.data);
        console.log(res.data);
        console.log(category);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      <div className="container h-screen px-4 mx-auto my-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-8 lg:w-3/4 lg:mb-0">
            <h1 className="text-3xl text-[#6CCFF6] font-bold mb-6">Derniers posts</h1>
            <div className="grid grid-cols-1 gap-8">
              {posts.map((post) => (
                <div className="p-6 rounded-lg shadow-lg" key={post.id}>
                  <div className="content">
                    <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
                    <p className="mb-4 text-gray-600">Likes: {post.like_count}</p>
                    <Link className="link" to={`/post/${post.id}`}>
                      <button className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded hover:bg-blue-700">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/4">
            <Category />
          </div>
        </div>
      </div>
    </>
  )
}
export default Home