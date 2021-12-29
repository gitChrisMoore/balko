import { supabase } from '../../data/supabase';
import { toApiAddress, toUiAddress } from './AddressAdapter';

export const createAddress = async (newAddress) => {
    const { data, error } = await supabase
        .from('addresses')
        .insert(toApiAddress(newAddress))
        .single();
    if (error) throw error;
    return toUiAddress(data);
};
export const getAddresses = async () => {
    const { data, error } = await supabase.from('addresses').select('*');
    if (error) throw error;

    let addresses = data.map((address) => {
        return toUiAddress(address);
    });
    return addresses;
};
export const getMostRecentAddress = async () => {
    const { data, error } = await supabase
        .from('addresses')
        .select()
        .order('id', { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return toUiAddress(data);
};
export const getAddressByID = async (id) => {
    const { data, error } = await supabase.from('addresses').select('*').match({ id: id }).single();
    if (error) throw error;
    return toUiAddress(data);
};
export const deleteAddresses = async () => {
    const { data, error } = await supabase.from('addresses').delete();
    if (error) throw error;
    return data;
};
export const deleteAddressByID = async (id) => {
    const { data, error } = await supabase.from('addresses').delete().match({ id: id }).single();
    if (error) throw error;
    return data;
};
