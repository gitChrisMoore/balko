import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/Auth';
import TextInputField from '../../components/TextInputField/TextInputField';
import SubmitFormButton from '../../components/SubmitFormButton/SubmitFormButton';
import TextField from '../../components/TextField/TextField';

function LoginForm() {
    const { signIn, user } = useAuth();

    const handleSubmit = async (formValues) => {
        signIn(formValues)
            .then(({ error }) => {
                if (error) throw new Error(error.message);
            })
            .catch((e) => {
                console.log(e);
                alert(e.message);
            });
    };

    const validationSchema = yup.object({
        email: yup.string().email().required(),
        password: yup
            .string()
            .required()
            .min(6, 'Password is too short - should be 6 chars minimum')
    });

    const formik = useFormik({
        initialValues: {
            email: process.env.REACT_APP_SERVICE_UN,
            password: process.env.REACT_APP_SERVICE_PW
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className="max-w-md px-2 m-auto justify-center v-screen ">
            Login
            <TextField id="user" name="user" label="logged in session">
                {user?.email}
            </TextField>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <Field
                        //
                        id="email"
                        name="email"
                        label="Email"
                        component={TextInputField}
                    />

                    <Field
                        //
                        id="password"
                        name="password"
                        label="Password"
                        component={TextInputField}
                    />
                    <SubmitFormButton id="submit" name="submit">
                        Submit
                    </SubmitFormButton>
                </Form>
            </FormikProvider>
        </div>
    );
}

export default LoginForm;
