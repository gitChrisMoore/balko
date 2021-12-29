import { supabase } from '../../data/supabase';
import { toApiTransaction, toUiTransaction } from './TransactionAdapter';

const TBL_NAME = 'dev_transactions';

export const createTransaction = async (newTransaction) => {
    const { data, error } = await supabase
        .from(TBL_NAME)
        .insert(toApiTransaction(newTransaction))
        .single();
    if (error) throw error;
    return toUiTransaction(data);
};
export const updateToProcessed = async (tx_id) => {
    const { data, error } = await supabase
        .from(TBL_NAME)
        .update({ processed: true })
        .match({ id: tx_id })
        .select('*')
        .single();
    if (error) throw error;
    return toUiTransaction(data);
};
export const getTransactions = async () => {
    const { data, error } = await supabase.from(TBL_NAME).select('*');
    if (error) throw error;

    let addresses = data.map((address) => {
        return toUiTransaction(address);
    });
    return addresses;
};
export const getTxByStateDesc = async (state_description) => {
    const { data, error } = await supabase
        .from(TBL_NAME)
        .select('*')
        .eq('state_description', state_description)
        .eq('processed', false);
    if (error) throw error;

    let transactions = data.map((transaction) => {
        return toUiTransaction(transaction);
    });
    return transactions;
};
export const getMostRecentTransaction = async () => {
    const { data, error } = await supabase
        .from(TBL_NAME)
        .select()
        .order('id', { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return toUiTransaction(data);
};
export const getTransactionByID = async (id) => {
    const { data, error } = await supabase.from(TBL_NAME).select('*').match({ id: id }).single();
    if (error) throw error;
    return toUiTransaction(data);
};
export const deleteTransactions = async () => {
    const { data, error } = await supabase.from(TBL_NAME).delete();
    if (error) throw error;
    return data;
};
export const deleteTransactionByID = async (id) => {
    const { data, error } = await supabase.from(TBL_NAME).delete().match({ id: id }).single();
    if (error) throw error;
    return data;
};
