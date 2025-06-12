export function validaSenha(senha: string): string[] {
  const erros: string[] = [];
  if (senha.length < 8) {
    erros.push("A senha deve ter pelo menos 8 caracteres.");
  }
  if (!/[a-z]/.test(senha)) {
    erros.push("A senha deve conter pelo menos uma letra minúscula.");
  }
  if (!/[A-Z]/.test(senha)) {
    erros.push("A senha deve conter pelo menos uma letra maiúscula.");
  }
  if (!/\d/.test(senha)) {
    erros.push("A senha deve conter pelo menos um número.");
  }
  if (!/[^a-zA-Z0-9]/.test(senha)) { 
    erros.push("A senha deve conter pelo menos um símbolo (ex: !@#$%^&*).");
  }
  return erros;
}