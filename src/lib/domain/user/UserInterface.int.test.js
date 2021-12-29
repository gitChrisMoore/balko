/* istanbul ignore file */
import UserInterface from './UserInterface';
import { supabase } from '../../data/supabase';
const { createUser, deleteUserByID } = UserInterface();

let MOCK_USER_3 = global.MOCK_DATA_USERS.user3_destructive;
let loggedinUserID;

beforeAll(async () => {
    try {
        await createUser({
            email: MOCK_USER_3.email,
            password: MOCK_USER_3.password
        });
    } catch (error) {
        console.log('UserInterface createUser- ', error);
    }

    try {
        const { error } = await supabase.auth.signIn({
            email: MOCK_USER_3.email,
            password: MOCK_USER_3.password
        });
        // if (error) throw new Error('error in beforeall:', error.message);
        if (error) throw error;
    } catch (error) {
        console.log('UserInterface createUser- ', error);
    }
});

describe('UserInterface Integration Test', () => {
    it('should have a valid auth session', () => {
        const session = supabase.auth.session();
        loggedinUserID = session.user.id;
        expect(loggedinUserID).not.toBeNull();
    });
    it('should delete the user', async () => {
        await deleteUserByID(loggedinUserID);
    });
});
