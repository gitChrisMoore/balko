import PersonInterface from './PersonInterface';
import { supabase } from '../../data/supabase';
const {
    createPerson,
    getPersons,
    getPersonByID,
    deletePersons,
    deletePersonByID,
    updateDateofBirth,
    updateGender
} = PersonInterface();

let MOCK_USER_1 = global.MOCK_DATA_USERS.user1;
let MOCK_USER_2 = global.MOCK_DATA_USERS.user2;
let loggedinUserID;
let newPerson;

beforeAll(async () => {
    const { error } = await supabase.auth.signIn({
        email: MOCK_USER_1.email,
        password: MOCK_USER_1.password
    });
    if (error) throw new Error('error in beforeall:', error.message);
});

describe('Person Integration Test', () => {
    it('should have a valid auth session', () => {
        const session = supabase.auth.session();
        loggedinUserID = session.user.id;
    });
    it('should create the users person', async () => {
        MOCK_USER_1.user_id = loggedinUserID;
        newPerson = await createPerson(MOCK_USER_1);
        expect(newPerson.id).toEqual(expect.any(Number));
    });
    it('should add the logged in user id before db create', async () => {
        expect(newPerson.user_id).toBe(loggedinUserID);
    });
    it('should have been returned in ui format', async () => {
        expect(newPerson.firstName).toBe(MOCK_USER_1.firstName);
        expect(newPerson.lastName).toBe(MOCK_USER_1.lastName);
        expect(newPerson.middleName).toBe(MOCK_USER_1.middleName);
    });
    it('should only allow a user to submit their own', async () => {
        const inavlidPerson = Object.create(MOCK_USER_1);
        inavlidPerson.user_id = MOCK_USER_2.user_id;
        await expect(createPerson(inavlidPerson)).rejects.toHaveProperty(
            'message',
            'new row violates row-level security policy for table "persons"'
        );
    });
    it('should return all persons for the user', async () => {
        let allPersons = await getPersons();
        expect(allPersons.length).toBeGreaterThan(0);
    });
    it('should return a single person', async () => {
        let res = await getPersonByID(newPerson.id);
        expect(res.id).toEqual(newPerson.id);
    });
    it('should update the persons birthday', async () => {
        let res = await updateDateofBirth(newPerson.id, '1990-10-02');
        expect(res.dateofBirth).toEqual('1990-10-02');
    });
    it('should update the persons gender', async () => {
        let res = await updateGender(newPerson.id, 'F');
        expect(res.gender).toEqual('F');
    });
    it('should delete a single person by ID', async () => {
        let res = await deletePersonByID(newPerson.id);
        expect(res.id).toEqual(newPerson.id);
    });
    it('Delete all persons from the user', async () => {
        await createPerson(MOCK_USER_1);
        await createPerson(MOCK_USER_1);
        let allPersons = await getPersons();
        expect(allPersons.length).toBeGreaterThan(0);
        let res = await deletePersons();
        expect(res.length).toBeGreaterThan(1);
        allPersons = await getPersons();
        expect(allPersons.length).toEqual(0);
    });
});
