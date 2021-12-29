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
export const getTransactions = async () => {
    const { data, error } = await supabase.from(TBL_NAME).select('*');
    if (error) throw error;

    let addresses = data.map((address) => {
        return toUiTransaction(address);
    });
    return addresses;
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
