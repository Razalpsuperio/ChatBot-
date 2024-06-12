import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [qnaList, setQnaList] = useState([]);
  const [file, setFile] = useState(null);

  const fetchQnAList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/qna/getQna');
      setQnaList(response.data);
    } catch (error) {
      console.error('Error fetching QnA list:', error);
    }
  };

  useEffect(() => {
    fetchQnAList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/qna/add', {
        question,
        answer,
      });

      setQuestion('');
      setAnswer('');
      setErrorMessage('');
      setIsAddModalOpen(false);
      setQnaList([...qnaList, response.data]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  useEffect(() => {
    fetchQnAList();
  }, [handleSubmit]);



  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      await axios.post('http://localhost:3000/qna/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setFile(null);
      setErrorMessage('');
      setIsUploadModalOpen(false);
      fetchQnAList();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };
  

  return (
<>
<br />
<br />
    <div className="flex justify-center items-center min-h-screen">
      <br />  <div className="flex flex-col items-center justify-center w-full max-w-4xl">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <div className="flex justify-end mb-4 space-x-4">
      
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Upload Excel
        </button>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Add Question
        </button>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center bg-gray-800">
          {/* Add Question Modal */}
          {/* Implement your Add Question modal content here */}
          <div className="bg-white p-8 rounded shadow-md">
            Add Question Modal Content
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center bg-gray-800">
          {/* Upload Excel Modal */}
          {/* Implement your Upload Excel modal content here */}
          <div className="bg-white p-8 rounded shadow-md">
            Upload Excel Modal Content
          </div>
        </div>
      )}

 {isAddModalOpen && (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center bg-gray-800">
      <div className="bg-white text-black p-8 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Question</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Answer:</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full bg-white"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}


{isUploadModalOpen && (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center bg-gray-800">
      <div className="bg-white text-black p-8 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-800"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

      {/* Table */}
      <div className="flex justify-center">
        <div className="">
          <table className="w-full text-center">
            <thead className="bg-violet-900 text-white">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2">Answer</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {qnaList.map((qna, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{qna.question}</td>
                  <td className="border px-4 py-2">{qna.answer}</td>
                  <td className="border px-4 py-2">
                    <div className='flex space-x-2'>
                    <button className='bg-violet-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                    <button className='bg-violet-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    </button>
                    </div>
                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<br />
<br />

</>
  
  );
};

export default AdminPage;
