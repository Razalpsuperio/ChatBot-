// {isAddModalOpen && (
//     <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center bg-gray-800">
//       <div className="bg-white text-black p-8 rounded shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">Add New Question</h2>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block">Question:</label>
//             <input
//               type="text"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               className="border border-gray-300 px-3 py-2 w-full bg-white"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block">Answer:</label>
//             <textarea
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               className="border border-gray-300 px-3 py-2 w-full bg-white"
//               required
//             ></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={() => setIsAddModalOpen(false)}
//               className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-800"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )}

//   {isUploadModalOpen && (
//     <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center bg-gray-800">
//       <div className="bg-white text-black p-8 rounded shadow-md w-96">
//         <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         <form onSubmit={handleFileUpload}>
//           <input
//             type="file"
//             accept=".xlsx, .xls"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="mb-4"
//             required
//           />
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={() => setIsUploadModalOpen(false)}
//               className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-800"
//             >
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )}