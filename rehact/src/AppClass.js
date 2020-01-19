import React, { Component } from 'react';
import './styles.css';

class App extends Component {
  state = {
    transactions: [],
    editingTransaction: null,
    newTransactionFormIsVisible: false
  }

  componentDidMount() {
    this.createTransaction({
      id: Date.now(),
      client: "Fake client",
      stablishment: "Fake stablishment",
      value: 200
    });
  }

  handleNewTransactionButtonClick = (e) => {
    this.setState({ newTransactionFormIsVisible: true });
  }

  hideNewTransactionForm = () => {
    this.setState({ newTransactionFormIsVisible: false, editingTransaction: null });
  }

  handleNewTransactionCancelButtonClick = (e) => {
    this.hideNewTransactionForm();
  }

  handleNewTransactionClientSelectChange = (e) => {
    const selectedValue = e.target.value;
    this.setState({
      editingTransaction: { ...this.state.editingTransaction, client: selectedValue }
    });
  }

  handleNewTransactionStablishmentSelectChange = (e) => {
    const selectedValue = e.target.value;
    this.setState({
      editingTransaction: { ...this.state.editingTransaction, stablishment: selectedValue }
    });
  }

  handleNewTransactionValueChange = (e) => {
    const selectedValue = e.target.value;
    this.setState({
      editingTransaction: { ...this.state.editingTransaction, value: selectedValue }
    });
  }

  handleNewTransactionFormSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.createTransaction(this.state.editingTransaction);

    this.hideNewTransactionForm();
  }

  validateForm = () => {
    if (!this.state.editingTransaction || !this.state.editingTransaction.client || !this.state.editingTransaction.stablishment || !this.state.editingTransaction.value) {
      return;
    }

    return true;
  }

  createTransaction = (transaction) => {
    transaction.id = Date.now();
    this.setState({
      transactions: [...this.state.transactions, transaction]
    })
  }

  calculateTransactionsTotal = () => {
    const newTransactionValue = (this.state.editingTransaction && this.state.editingTransaction.value) || 0;
    return this.state.transactions.reduce((prev, act) => prev += Number.parseInt(act.value), 0) + Number.parseInt(newTransactionValue);
  }

  render() {
    return (
      <div>
        <h2>
          Class
        </h2>
        <button onClick={() => { this.handleNewTransactionButtonClick() }}>Nova transação</button>
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
            {this.state.transactions.map(t => (<tr key={t.id}><td>{t.id}</td><td>{t.client}</td><td>{t.stablishment}</td><td>{t.value}</td></tr>))}

            {this.state.editingTransaction != null &&
              <tr><td>xxxxxxxx</td><td>{this.state.editingTransaction.client}</td><td>{this.state.editingTransaction.stablishment}</td><td>{this.state.editingTransaction.value}</td></tr>
            }

          </tbody>
          <tfoot>
            <tr><td></td><td></td><td></td><td>{`Total: ${this.calculateTransactionsTotal()}`}</td></tr>
          </tfoot>
        </table>

        {this.state.newTransactionFormIsVisible &&
          <form onSubmit={(e) => { this.handleNewTransactionFormSubmit(e) }}>
            <h4>New transaction</h4>
            <label>Name</label>
            <br />
            <select onChange={(e) => { this.handleNewTransactionClientSelectChange(e) }}>
              <option value={""}>Selecionar</option>
              <option value={"Ricaro Vaz Corrêa"}>Ricaro Vaz Corrêa</option>
              <option value={"Lê"}>Lê</option>
              <option value={"Gabigo(r)"}>Gabigo(r)</option>
            </select>
            <br />
            <br />
            <label>Estabelecimento</label><br />
            <select onChange={(e) => { this.handleNewTransactionStablishmentSelectChange(e) }}>
              <option value={""}>Selecionar</option>
              <option value={"Casa do gabigo"}>Casa do gabigo</option>
              <option value={"Açai"}>Açai</option>
              <option value={"Magnum"}>Magnum</option>
            </select>
            <br />
            <br />
            <label>Valor</label>
            <br />
            <input type="number" onChange={(e) => { this.handleNewTransactionValueChange(e) }} />
            <br />
            <br />
            <input type="button" onClick={() => { this.handleNewTransactionCancelButtonClick() }} value="Cancelar" />
            <input type="submit" value="Salvar" />
          </form>
        }
      </div>
    )
  }
}

export default App;


