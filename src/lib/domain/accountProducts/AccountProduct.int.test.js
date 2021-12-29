import { createAccountProduct, getAccountProducts } from './AccountProduct';
import { supabase } from '../../data/supabase';

let MOCK_USER_1 = global.MOCK_DATA_USERS.user1;
let MOCK_PRODUCT_1 = global.MOCK_DATA_ACCOUNTPRODUCTS.product1;
let loggedinUserID;
let newAccountProduct;

beforeAll(async () => {
    const { error } = await supabase.auth.signIn({
        email: MOCK_USER_1.email,
        password: MOCK_USER_1.password
    });
    if (error) throw new Error('error in beforeall:', error.message);
});

describe('AccountProduct Integration Test', () => {
    it('should have a valid auth session', () => {
        const session = supabase.auth.session();
        loggedinUserID = session.user.id;
    });
    it('should create the new Account Product', async () => {
        MOCK_PRODUCT_1.user_id = loggedinUserID;
        newAccountProduct = await createAccountProduct(MOCK_PRODUCT_1);
        console.log('newAccountProduct', newAccountProduct);
        expect(newAccountProduct.id).toEqual(expect.any(Number));
    });
});
