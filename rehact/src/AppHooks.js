import React, { useState, useEffect } from 'react';
import './styles.css';

const App = props => {

  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newTransactionFormIsVisible, setNewTransactionFormIsVisible] = useState(false);

  useEffect(() => {
    createTransaction({
      id: Date.now(),
      client: "Fake client",
      stablishment: "Fake stablishment",
      value: 400
    });
  }, []);

  const handleNewTransactionButtonClick = (e) => {
    setNewTransactionFormIsVisible(true);
  }

  const hideNewTransactionForm = () => {
    setNewTransactionFormIsVisible(false);
    setEditingTransaction(null);
  }

  const handleNewTransactionCancelButtonClick = (e) => {
    hideNewTransactionForm();
  }

  const handleNewTransactionClientSelectChange = (e) => {
    const selectedValue = e.target.value;
    setEditingTransaction({ ...editingTransaction, client: selectedValue });
  }

  const handleNewTransactionStablishmentSelectChange = (e) => {
    const selectedValue = e.target.value;
    setEditingTransaction({ ...editingTransaction, stablishment: selectedValue });
  }

  const handleNewTransactionValueChange = (e) => {
    const selectedValue = e.target.value;
    setEditingTransaction({ ...editingTransaction, value: selectedValue });
  }

  const handleNewTransactionFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createTransaction(editingTransaction);

    hideNewTransactionForm();
  }

  const validateForm = () => {
    if (!editingTransaction || !editingTransaction.client || !editingTransaction.stablishment || !editingTransaction.value) {
      return;
    }

    return true;
  }

  const createTransaction = (transaction) => {
    transaction.id = Date.now();
    setTransactions([...transactions, transaction]);
  }

  const calculateTransactionsTotal = () => {
    const newTransactionValue = (editingTransaction && editingTransaction.value) || 0;
    return transactions.reduce((prev, act) => prev += Number.parseInt(act.value), 0) + Number.parseInt(newTransactionValue);
  }

  return (
    <div>
      <h2>
        Hooks
        </h2>
      <button onClick={() => { handleNewTransactionButtonClick() }}>Nova transação</button>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Cliente</td>
            <td>Estabelecimento</td>
            <td>Valor (R$)</td>
          </tr>
        </thead>
        <tbody >
          {transactions.map(t => (<tr key={t.id}><td>{t.id}</td><td>{t.client}</td><td>{t.stablishment}</td><td>{t.value}</td></tr>))}

          {editingTransaction != null &&
            <tr><td>xxxxxxxx</td><td>{editingTransaction.client}</td><td>{editingTransaction.stablishment}</td><td>{editingTransaction.value}</td></tr>
          }
        </tbody>
        <tfoot>
          <tr><td></td><td></td><td></td><td>{`Total: ${calculateTransactionsTotal()}`}</td></tr>
        </tfoot>
      </table>

      {newTransactionFormIsVisible &&
        <form onSubmit={(e) => { handleNewTransactionFormSubmit(e) }}>
          <h4>New transaction</h4>
          <label>Name</label>
          <br />
          <select onChange={(e) => { handleNewTransactionClientSelectChange(e) }}>
            <option value={""}>Selecionar</option>
            <option value={"Ricaro Vaz Corrêa"}>Ricaro Vaz Corrêa</option>
            <option value={"Lê"}>Lê</option>
            <option value={"Gabigo(r)"}>Gabigo(r)</option>
          </select>
          <br />
          <br />
          <label>Estabelecimento</label><br />
          <select onChange={(e) => { handleNewTransactionStablishmentSelectChange(e) }}>
            <option value={""}>Selecionar</option>
            <option value={"Casa do gabigo"}>Casa do gabigo</option>
            <option value={"Açai"}>Açai</option>
            <option value={"Magnum"}>Magnum</option>
          </select>
          <br />
          <br />
          <label>Valor</label>
          <br />
          <input type="number" onChange={(e) => { handleNewTransactionValueChange(e) }} />
          <br />
          <br />
          <input type="button" onClick={() => { handleNewTransactionCancelButtonClick() }} value="Cancelar" />
          <input type="submit" value="Salvar" />
        </form>
      }
    </div>
  );
}

export default App;
