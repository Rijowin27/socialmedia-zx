import { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios'; // Import axios for making HTTP requests

const CreatePost = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    try {
      // Send a POST request to the new backend API
      await axios.post('/api/posts', {
        userId: user.id, // Include user ID
        content: content,
      });
      e.target.reset();
    } catch (error) {
      setErrorMessage('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="content" required />
      <button type="submit">Create Post</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CreatePost;
