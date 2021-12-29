import { supabase } from '../../data/supabase';
import { toApiAccount, toUiAccount } from './AccountAdapter';

export const createAccount = async (newAccount) => {
    const { data, error } = await supabase
        .from('accounts')
        .insert(toApiAccount(newAccount))
        .single();
    if (error) throw error;
    return toUiAccount(data);
};
export const getAccounts = async () => {
    const { data, error } = await supabase.from('accounts').select('*');
    if (error) throw error;

    let addresses = data.map((address) => {
        return toUiAccount(address);
    });
    return addresses;
};
export const getMostRecentAccount = async () => {
    const { data, error } = await supabase
        .from('accounts')
        .select()
        .order('id', { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return toUiAccount(data);
};
export const getAccountByID = async (id) => {
    const { data, error } = await supabase.from('accounts').select('*').match({ id: id }).single();
    if (error) throw error;
    return toUiAccount(data);
};
export const deleteAccounts = async () => {
    const { data, error } = await supabase.from('accounts').delete();
    if (error) throw error;
    return data;
};
export const deleteAccountByID = async (id) => {
    const { data, error } = await supabase.from('accounts').delete().match({ id: id }).single();
    if (error) throw error;
    return data;
};
