import * as Yup from 'yup';

export const registrationSchema = Yup.object({
	email: Yup.string().email('Incorrect e-mail address').required('Required'),
	password: Yup.string()
		.min(4, 'Minimal length is 8')
		.max(12, 'Maximal length is 50')
		// .matches(
		// 	/(?=(.*[a-z])+)(?=(.*[A-Z])+)(?=(.*[0-9])+)(?=(.*[!@#$%^&*()\-__+.])+).{8,}$/gm,
		// 	'Password should contain one or more: capital letter, number, symbol'
		// )
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], "Passwords aren't equal")
		.required('Required'),
});
