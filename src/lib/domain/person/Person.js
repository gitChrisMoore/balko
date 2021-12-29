import { supabase } from '../../data/supabase';
import { toApiPerson, toUiPerson } from './PersonAdapter';

export const createPerson = async (person) => {
    const { data, error } = await supabase.from('persons').insert(toApiPerson(person)).single();
    if (error) throw error;
    return toUiPerson(data);
};

export const getPersons = async () => {
    const { data, error } = await supabase.from('persons').select('*');
    if (error) throw error;

    let persons = data.map((person) => {
        return toUiPerson(person);
    });
    return persons;
};
export const getMostRecentPerson = async () => {
    const { data, error } = await supabase
        .from('persons')
        .select()
        .order('id', { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return toUiPerson(data);
};
export const getPersonByID = async (id) => {
    const { data, error } = await supabase.from('persons').select('*').match({ id: id }).single();
    if (error) throw error;
    return toUiPerson(data);
};
export const deletePersons = async () => {
    const { data, error } = await supabase.from('persons').delete();
    if (error) throw error;
    return data;
};
export const deletePersonByID = async (id) => {
    const { data, error } = await supabase.from('persons').delete().match({ id: id }).single();
    if (error) throw error;
    return data;
};
export const updateDateofBirth = async (id, dateofBirth) => {
    const { data, error } = await supabase
        .from('persons')
        .update({ date_of_birth: dateofBirth })
        .match({ user_id: id })
        .single();
    if (error) throw error;
    return toUiPerson(data);
};
export const updateGender = async (id, gender) => {
    const { data, error } = await supabase
        .from('persons')
        .update({ gender: gender })
        .match({ id: id })
        .single();
    if (error) throw error;
    return toUiPerson(data);
};
