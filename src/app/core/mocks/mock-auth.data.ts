import { SystemUser } from '../../features/users/domain/models/system-user.model';

function makeMockJwt(claims: object): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const payload = btoa(JSON.stringify(claims))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return `${header}.${payload}.mock-sig`;
}

export function getMockUsernameAuthResponse(username: string, account_slug: string) {
  const token = makeMockJwt({
    sub: 'usr-tenant-mock',
    name: username,
    email: `${username}@${account_slug}.mock`,
    role: 'operations',
    type: 'individual',
    account_slug,
    exp: 9999999999,
    iat: 1000000000,
  });

  return {
    data: { token },
    message: 'Login realizado com sucesso',
  };
}

export function getMockAuthResponse(email: string, users: SystemUser[]) {
  const user = users.find(u => u.email === email);
  if (!user) return null;

  const token = makeMockJwt({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    type: user.type,
    account_slug: 'cafe-do-norte',
    exp: 9999999999,
    iat: 1000000000,
  });

  return {
    data: { token },
    message: 'Login realizado com sucesso',
  };
}
