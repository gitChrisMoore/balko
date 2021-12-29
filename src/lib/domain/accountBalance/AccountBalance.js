import { supabase } from '../../data/supabase';
import { toUiAccountBalance } from './AccountBalanceAdapter';

const TBL_NAME = 'dev_current_balance';

export const getCurrentBalanceByID = async (accounts_id) => {
    const { data, error } = await supabase
        .from(TBL_NAME)
        .select('*')
        .match({ accounts_id: accounts_id })
        .single();
    if (error) throw error;
    return toUiAccountBalance(data);
};
