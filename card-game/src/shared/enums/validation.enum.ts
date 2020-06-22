export enum ValidationEnum {
  EMPTY_NAME_MSG = 'NOME VAZIO: Informe seu nome, corretamente',
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_EMAIL_MSG = 'E-MAIL INCORRETO: O e-mail informado esta mal formatado',
  WEAK_PASSWORD = 'auth/weak-password',
  WEAK_PASSWORD_MSG = 'SENHA FRACA: Sua senha tem que ter ao menos 6 caracteres',
  EMAIL_IN_USE = 'auth/email-already-in-use',
  EMAIL_IN_USE_MSG = 'E-MAIL JÁ EM USO: O e-mail informado já esta sendo utilizado',
  WRONG_PASSWORD = 'auth/wrong-password',
  WRONG_PASSWORD_MSG = 'SENHA INCORRETA: A senha esta incorreta ou o e-mail não esta cadastrado',
  USER_NOT_FOUND = 'auth/user-not-found',
  USER_NOT_FOUND_MSG = 'USUÁRIO NÃO ENCONTRADO: Não existe registros do e-mail informado. Esta conta deve ter sido deletada'
}
