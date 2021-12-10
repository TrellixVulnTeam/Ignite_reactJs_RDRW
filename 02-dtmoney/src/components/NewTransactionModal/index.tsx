import Modal from "react-modal";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from '../../assets/close.svg';
import { FormEvent, useState, useContext } from "react";
import { TransactionContext } from "../../TransactionsContext";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps ) {
    const { createTransaction } = useContext(TransactionContext)
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose() 
    }

    return (
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >

        <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>
            <input 
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="Título" />

            <input 
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}                
                type="number"
                placeholder="Valor" />
            
            <TransactionTypeContainer>
                <RadioBox 
                    type="button"
                    isActive={type === 'deposit'}
                    onClick={() => { setType('deposit') }}
                    activeColor='green'
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    isActive={type === 'withdraw'}
                    onClick={() => { setType('withdraw') }}
                    activeColor='red'          
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>

            <input 
                value={category}
                onChange={event => setCategory(event.target.value)}
                placeholder="Categoria" />
            
            <button type="submit">
                Cadastrar
            </button>
        </Container>
        
      </Modal>
    )
}