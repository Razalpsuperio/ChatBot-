import express from 'express';
import QnA from '../model/QnASchema.js'
const router = express.Router();
import xlsx from 'xlsx';
import upload from '../middleware/multerConfig.js'
router.post('/add', async (req, res) => {
  const { question, answer } = req.body;

  try {

    const existingQuestion = await QnA.findOne({ question });

    if (existingQuestion) {
      return res.status(400).json({ error: 'Question already exists' });
    }


    const newQnA = new QnA({
      question,
      answer
    });


    await newQnA.save();

    res.status(201).json({ message: 'Question and answer added successfully' });
  } catch (error) {
    console.error('Error adding question and answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/getQna', async (req, res) => {
    try {
      const qnaList = await QnA.find();
      res.json(qnaList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/getAnswers', async (req, res) => {
    const { question } = req.query;
  
    try {

        const relatedQuestions = await QnA.find({ question: { $regex: question, $options: 'i' } });
  
        if (relatedQuestions.length === 0) {
            return res.status(404).json({ error: 'No related questions found' });
        }
 
        const answers = relatedQuestions.map(qna => qna.answer);
  
        res.json({ answers });
    } catch (error) {
        console.error('Error getting answers for question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const filePath = path.resolve('public', req.file.filename); // Use path.resolve
    if (!fs.existsSync(filePath)) {
      return res.status(400).send('File not found.');
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const qnaData = rows.map(row => ({
      question: row.Question,
      answer: row.Answer,
    }));

    await QnA.insertMany(qnaData);

    res.status(200).send('File uploaded and data extracted successfully.');
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file.');
  }
});


export default router;
