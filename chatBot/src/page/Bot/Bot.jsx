import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios'; 
import './Bot.css';

import Aiassess from './aiassess.svg';

const Bot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [firstTimeOpen, setFirstTimeOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleButtonClick = () => {
    setIsChatOpen(!isChatOpen);
    if (firstTimeOpen) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Hi, how can I help you?', sender: 'bot' }
      ]);
      setFirstTimeOpen(false);
    }
  };

  const handleMessageSend = async () => {
    if (messageInput.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageInput, sender: 'user' }
      ]);

      setIsLoading(true);

      try {
        const response = await axios.get('http://localhost:3000/qna/getAnswers', {
          params: { question: messageInput }
        });
        const botResponse = response.data.answers;

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse || 'Could you please clarify?', sender: 'bot' }
          ]);
          setError('');
          setIsLoading(false);
        }, 1000); 

      } catch (error) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Could you please clarify?', sender: 'bot' }
          ]);
          setError('Question not found');
          setIsLoading(false);
        }, 1000); 
      }

      setMessageInput('');
    }
  };

  return (
    <div>
      <div className='fixed bottom-4 right-8'>
        <button
          onClick={handleButtonClick}
          className=' bg-transparent text-white p-2 rounded-full border-transparent'
        >
            <img src={Aiassess} alt="" className='w-14 h-20'/>
        </button>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-32 right-8 bg-white shadow-lg rounded-lg w-80 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold text-gray-800"
              >
                Chat with us
              </motion.h2>
            </div>
            <div className="flex flex-col h-64 overflow-y-auto" style={{ maxHeight: '400px', paddingRight: '10px' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  <div
                    className={`${
                      message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
                    } rounded-lg p-2 max-w-xs`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center border-t pt-4 mt-4">
              <input
                type="text"
                className="flex-1 border rounded p-2 mr-2 focus:outline-none bg-gray-200 text-gray-800"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="text-white px-4 py-2 rounded bg-gray-200 text-gray-800"
                onClick={handleMessageSend}
              >
                {isLoading ? ( // Show loading animation if isLoading is true
                  <div className="loader"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send text-black"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bot;
