import { supabase } from '../../data/supabase';
import { toApiAddress, toUiAddress } from './AddressAdapter';

const AddressInterface = () => {
    const createAddress = async (newAddress) => {
        const { data, error } = await supabase
            .from('addresses')
            .insert(toApiAddress(newAddress))
            .single();
        if (error) throw error;
        return toUiAddress(data);
    };
    const getAddresses = async () => {
        const { data, error } = await supabase.from('addresses').select('*');
        if (error) throw error;

        let addresses = data.map((address) => {
            return toUiAddress(address);
        });
        return addresses;
    };
    const getAddressByID = async (id) => {
        const { data, error } = await supabase
            .from('addresses')
            .select('*')
            .match({ id: id })
            .single();
        if (error) throw error;
        return toUiAddress(data);
    };
    const deleteAddresses = async () => {
        const { data, error } = await supabase.from('addresses').delete();
        if (error) throw error;
        return data;
    };
    const deleteAddressByID = async (id) => {
        const { data, error } = await supabase
            .from('addresses')
            .delete()
            .match({ id: id })
            .single();
        if (error) throw error;
        return data;
    };

    return {
        createAddress,
        getAddresses,
        getAddressByID,
        deleteAddresses,
        deleteAddressByID
    };
};
export default AddressInterface;
