/* istanbul ignore file */
import { supabase } from '../../data/supabase';
import { server_supabase } from '../../data/server_supabase';

const UserInterface = () => {
    const createUser = async (user) => {
        const { data, error } = await supabase.auth.signUp(user);
        if (error) throw error;
        return data;
    };
    const deleteUserByID = async (id) => {
        const { data: user, error } = await server_supabase.auth.api.deleteUser(
            id,
            process.env.REACT_APP_SUPABASE_SERVICE_KEY
        );
        if (error) throw error;
        return user;
    };

    return {
        createUser,
        deleteUserByID
    };
};
export default UserInterface;
