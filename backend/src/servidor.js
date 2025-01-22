import cors from 'cors';
import express from 'express';
import Routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', Routes);

const porta = 3000;

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`);
});

export default app;