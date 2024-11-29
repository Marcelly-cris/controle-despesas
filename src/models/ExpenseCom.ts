import mongoose, { Schema } from 'mongoose';

// Crie o schema com base na interface
const expenseSchema = new Schema({
  descricao: {
    type: String,
    required: [true, 'A descrição é obrigatória.']
  },
  valor: {
    type: Number,
    required: [true, 'O valor é obrigatório.']
  },
  data: {
    type: Date,
    required: [true, 'A data é obrigatória.']
  }
});

const Despesa = mongoose.model('Expense', expenseSchema);

export { Despesa };
