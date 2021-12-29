import { getCurrentBalanceByID } from '../lib/domain/accountBalance/AccountBalance';
import {
    createTransaction,
    getTxByStateDesc,
    updateToProcessed
} from '../lib/domain/transactions/Transaction';

const makeTx = (oldTx, state_id, stateDescription) => {
    const txRequest = {
        token: oldTx.token,
        user_id: oldTx.user_id,
        individuals_id: oldTx.individuals_id,
        accounts_id: oldTx.accounts_id,
        accountProducts_id: oldTx.accountProducts_id,
        createdBy: oldTx.createdBy,
        amount: oldTx.amount,
        balanceDelta: oldTx.balanceDelta,
        status: oldTx.status,
        source: oldTx.source,
        type: oldTx.type,
        processed: false,
        state_id: state_id,
        stateDescription: stateDescription
    };

    return txRequest;
};

const validFundsAdd = (tx) => {
    if (
        tx.stateDescription === 'PENDING_APPROVAL' &&
        tx.type === 'FUNDS_ADD' &&
        tx.createdBy === tx.user_id
    ) {
        return true;
    } else return false;
};
const validFinalFundsAdd = (tx) => {
    if (tx.stateDescription === 'APPROVED' && tx.type === 'FUNDS_ADD') return true;
};

const sufficientFunds = (tx, balance) => {
    if (balance >= tx.amount && tx.type === 'INVOICE') return true;
};

export const processTransactions = async () => {
    // Process Pending Transcations
    //
    // validate new funded rules
    // process existing transcation
    // create new transaction
    //
    const pendingTxs = await getTxByStateDesc('PENDING_APPROVAL');
    for (const tx of pendingTxs) {
        if (validFundsAdd(tx)) {
            const processed = await updateToProcessed(tx.id);
            const txRequest = makeTx(processed, 1500, 'APPROVED');
            const res = await createTransaction(txRequest);
            console.log('res', res);
        }
    }

    const approvedTxs = await getTxByStateDesc('APPROVED');
    for (const tx of approvedTxs) {
        if (validFinalFundsAdd(tx)) {
            const processed = await updateToProcessed(tx.id);
            const txRequest = makeTx(processed, 2500, 'FINAL');
            const res = await createTransaction(txRequest);
            console.log('approvedTxs', res);
        } else {
            const currentBalance = await getCurrentBalanceByID(tx.accounts_id);
            console.log('tx', tx);
            console.log('current balance', currentBalance);
            if (sufficientFunds(tx, currentBalance.currentBalance)) {
                const processed = await updateToProcessed(tx.id);
                processed.balanceDelta = processed.amount * -1;
                const txRequest = makeTx(processed, 2500, 'FINAL');
                const res = await createTransaction(txRequest);
                console.log('approvedTxs', res);
            }
        }
    }

    return;
};
