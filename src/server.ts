import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import despesasRoutes from "./routes/DespesasRoutes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json()); // Para lidar com JSON no corpo da requisição

// Habilitando CORS para o frontend rodando na porta 3000
app.use(cors())

app.use("/api", despesasRoutes); // Rota principal para as despesas

// URI do MongoDB (pega do arquivo .env ou usa um padrão local)
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/expensesDB";

// Função para conectar ao MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Conexão com o MongoDB estabelecida!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra o servidor em caso de erro crítico
  }
}

const PORT = process.env.PORT || 3001;

// Inicia o servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await connectDB(); // Conecta ao banco de dados
});
