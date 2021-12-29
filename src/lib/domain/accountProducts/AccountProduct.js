import { supabase } from '../../data/supabase';
import { toApiAccountProduct, toUiAccountProduct } from './AccountProductAdapter';

export const createAccountProduct = async (newAccountProduct) => {
    const { data, error } = await supabase
        .from('account_products')
        .insert(toApiAccountProduct(newAccountProduct))
        .single();
    if (error) throw error;
    return toUiAccountProduct(data);
};
export const getAccountProducts = async () => {
    const { data, error } = await supabase.from('account_products').select('*');
    if (error) throw error;

    let addresses = data.map((address) => {
        return toUiAccountProduct(address);
    });
    return addresses;
};
export const getMostRecentAccountProduct = async () => {
    const { data, error } = await supabase
        .from('account_products')
        .select()
        .order('id', { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return toUiAccountProduct(data);
};
export const getAccountProductByID = async (id) => {
    const { data, error } = await supabase
        .from('account_products')
        .select('*')
        .match({ id: id })
        .single();
    if (error) throw error;
    return toUiAccountProduct(data);
};
export const deleteAccountProducts = async () => {
    const { data, error } = await supabase.from('account_products').delete();
    if (error) throw error;
    return data;
};
export const deleteAccountProductByID = async (id) => {
    const { data, error } = await supabase
        .from('account_products')
        .delete()
        .match({ id: id })
        .single();
    if (error) throw error;
    return data;
};
