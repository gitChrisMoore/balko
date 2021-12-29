import { supabase } from '../../data/supabase';
import { toApiPhone, toUiPhone } from './PhoneAdapter';

export const createPhone = async (person) => {
    const { data, error } = await supabase
        .from('phone_numbers')
        .insert(toApiPhone(person))
        .single();
    if (error) throw error;
    return toUiPhone(data);
};

export const getPhones = async () => {
    const { data, error } = await supabase.from('phone_numbers').select('*');
    if (error) throw error;

    let phones = data.map((person) => {
        return toUiPhone(person);
    });
    return phones;
};
export const getMostRecentPhone = async () => {
    const { data, error } = await supabase
        .from('phone_numbers')
        .select()
        .order('id', { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return toUiPhone(data);
};
export const getPhoneByID = async (id) => {
    const { data, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .match({ id: id })
        .single();
    if (error) throw error;
    return toUiPhone(data);
};
export const deletePhones = async () => {
    const { data, error } = await supabase.from('phone_numbers').delete();
    if (error) throw error;
    return data;
};
export const deletePhoneByID = async (id) => {
    const { data, error } = await supabase
        .from('phone_numbers')
        .delete()
        .match({ id: id })
        .single();
    if (error) throw error;
    return data;
};
