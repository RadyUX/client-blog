import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import authService from '../service/authService';

function Write() {
    const state = useLocation().state?.post;
    console.log('State data:', state);
    const [value, setValue] = useState(state?.content || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState<File | null>(null);
    const [cat, setCat] = useState(state?.cat || '');

    const navigate = useNavigate();

    const upload = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file as Blob);
            console.log('file', file);
            const res = await axios.post('http://localhost:8000/api/upload', formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const currentUser = authService.getCurrentUser();
    const token = currentUser?.user?.token;
    const userId = currentUser?.user?.user.id;

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state
                ? await axios.put(
                      `http://localhost:8000/posts/update/${state.id}`,
                      {
                          title,
                          content: value,
                          category: cat,
                          image: file ? imgUrl : '',
                      },
                      {
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                  )
                : await axios.post(
                      `http://localhost:8000/posts/create`,
                      {
                          title,
                          content: value,
                          category: cat,
                          image: file ? imgUrl : '',
                          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                          admin_id: userId,
                      },
                      {
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                  );
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex md:flex-col lg:flex-row p-4 space-y-4 mx-[400px] justify-around lg:space-y-0 lg:space-x-4'>
            <div className='flex-1 p-4 text-black bg-white rounded-lg shadow-md'>
                <input
                    type='text'
                    placeholder='Title'
                    className='w-full p-2 mb-4 border border-gray-300 rounded'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='editorContainer'>
                    <ReactQuill
                        className='text-black editor'
                        theme='snow'
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <input
                style={{ display: 'none' }}
                type='file'
                id='file'
                name='file'
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                    }
                }}
            />
            <label className='file' htmlFor='file'>
                Upload Image
            </label>
            <div className='w-full p-4 text-black bg-white rounded-lg shadow-md lg:w-1/3'>
                <div className='mb-4'>
                    <span className='block mb-2'>
                        <b>Status: </b> Draft
                    </span>
                    <span className='block mb-4'>
                        <b>Visibility: </b> Public
                    </span>
                    <div className='flex space-x-2 buttons'>
                        <button
                            type='button'
                            className='flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
                            onClick={handleClick}>
                            Publish
                        </button>
                    </div>
                </div>
                <div className='item'>
                    <h1 className='mb-2 text-xl font-bold'>Category</h1>
                    <div className='flex flex-col space-y-2 cat'>
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                checked={cat === 'react'}
                                name='cat'
                                value='react'
                                id='react'
                                className='mr-2'
                                onChange={(e) => setCat(e.target.value)}
                            />
                            <label htmlFor='react'>react</label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                checked={cat === 'typescript'}
                                name='cat'
                                value='typescript'
                                id='typescript'
                                className='mr-2'
                                onChange={(e) => setCat(e.target.value)}
                            />
                            <label htmlFor='typescript'>typescript</label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                checked={cat === 'database'}
                                name='cat'
                                value='database'
                                id='database'
                                className='mr-2'
                                onChange={(e) => setCat(e.target.value)}
                            />
                            <label htmlFor='database'>Database</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;
