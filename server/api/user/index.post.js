import { UserModel } from './../../models/User.model'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	// verify user loggin
	if (!event.context.auth) {
		throw createError({
			statusCode: 401,
			message: 'Faça o login para continuar!',
		})
	}

	// Verify user master
	if (!(await checkUserMaster(event))) {
		throw createError({
			statusCode: 401,
			message:
				'Sem permissão para registrar usuários, contate um administrador!',
		})
	}

	// verify user exists
	const checkUserExists = await UserModel.findOne({
		where: { email: body.email },
	})
	if (checkUserExists) {
		throw createError({
			statusCode: 402,
			message: 'Esse usuário já existe, tente outro e-mail!',
		})
	}

	// Create new user
	const user = await UserModel.create({
		name: body.name,
		email: body.email,
		password: await genPassHash(body.password).then((hash) => hash),
		role: body.role,
	})

	return {
		id: user.id,
		message: 'usuário registrado com sucesso!',
	}
})
