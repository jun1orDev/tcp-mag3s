import { UserModel } from "./../../models/User.model";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const login = await readBody(event);

    // verify user exists
    const user = await UserModel.findOne({
        where: { email: login.email },
    });
    if (!user) {
        throw createError({
            statusCode: 402,
            message: "Esse usuário não existe, tente novamente!",
        });
    }

    // compare password
    const checkPassword = await bcrypt.compare(login.password, user.password);
    if (!checkPassword) {
        throw createError({
            statusCode: 402,
            message: "Senha Inválida, tente novamente!",
        });
    }

    // save Cookie
    setCookie(event, 'idUser', user.id, {
      maxAge: 60,
      httpOnly: true,
    })

    return {
        message: "usuário logado com sucesso!",
    };
});
