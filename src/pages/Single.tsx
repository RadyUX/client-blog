import DOMPurify from 'dompurify';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import authService from '../service/authService';

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  like_count: number;
}

function Single() {
  const [post, setPost] = useState<Post | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/post/${postId}`);
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    const token = currentUser?.user.token;
    try {
      await axios.delete(`http://localhost:8000/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (post: Post) => {
    try {
      navigate('/write', { state: { post } });
    } catch (err) {
      console.log(err);
    }
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    const token = currentUser?.user.token;
    try {
      const newLikeStatus = !isLiked;
      const response = await axios.post(
        `http://localhost:8000/like/${postId}`,
        { like: newLikeStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post like:", response.data);
      if (response.data.success) {
        setIsLiked(newLikeStatus);
        console.log(newLikeStatus ? "Post liked" : "Post unliked");
      } else {
        console.log("Failed to toggle the like status.");
        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      console.error('Error toggling like on the post:', error);
      setIsLiked((prevIsLiked) => !prevIsLiked);
    }
  };

  console.log(post?.image);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex justify-center h-screen max-w-5xl p-8 mx-auto single">
      <div className="w-full p-8 rounded-lg shadow-lg content lg:w-3/4">
        <img
          src={`../../public/upload/${post.image}`}
          alt={post.title}
          className="object-cover w-full h-64 mb-6 rounded-lg"
        />
        <div className="flex items-center mb-6 user"></div>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <p className="mb-4 text-xl text-gray-700">{post.category}</p>
        <div className="flex items-center mb-6">
          <p className="mr-4 text-lg">{post.like_count}</p>
          {currentUser && (
            <button
              onClick={handleLike}
              className="px-4 py-2 m-3 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Like
            </button>
          )}
          {currentUser?.decodedToken.isAdmin && (
            <div>
              <button
                onClick={handleDelete}
                className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
              >
                DELETE
              </button>
              <button
                onClick={() => handleUpdate(post)}
                className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          )}
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></div>
      </div>
    </div>
  );
}

export default Single;
