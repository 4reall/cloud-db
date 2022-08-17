import * as Yup from 'yup';

export const loginValidation = Yup.object({
	email: Yup.string().email('Incorrect e-mail address').required('Required'),
});
