import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]); // Add a state to store the books
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch books from API on mount
    axios.get('http://localhost:5555/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        enqueueSnackbar('Error fetching books', { variant: 'error' });
        console.log(error);
      });
  }, []);

  const handleSaveBook = (event) => {
    event.preventDefault(); // Add this to prevent form submission
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(response => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        setBooks([...books, response.data]); // Add the new book to the list
        navigate('/');
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar('Error creating book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <form onSubmit={handleSaveBook}> {/* Wrap the form elements in a form tag */}
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          <button className='p-2 bg-sky-300 m-8' type='submit'> {/* Add type='submit' to the button */}
            Save
          </button>
        </form>
      </div>
      <h2 className='text-2xl my-4'>Books:</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author} ({book.publishYear})</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateBooks;