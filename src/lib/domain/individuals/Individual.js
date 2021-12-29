import { supabase } from '../../data/supabase';
import { toApiIndividual, toUiIndividual } from './IndividualAdapter';

export const createIndividual = async (individual) => {
    console.log('createIndividual', individual);
    const { data, error } = await supabase
        .from('individuals')
        .insert(toApiIndividual(individual))
        .single();
    if (error) throw error;
    console.log('data', data);
    return toUiIndividual(data);
};

export const getIndividuals = async () => {
    const { data, error } = await supabase.from('individuals').select('*');
    if (error) throw error;

    let individuals = data.map((individual) => {
        return toUiIndividual(individual);
    });
    return individuals;
};
export const getIndividual = async () => {
    const { data, error } = await supabase.from('individuals').select('*').limit(1).single();
    if (error) throw error;

    return toUiIndividual(data);
};
