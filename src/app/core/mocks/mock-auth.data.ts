// JWT com claims: sub=1, role=admin, type=system, account_slug=cafe-do-norte, exp=9999999999
const MOCK_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIE1vY2siLCJlbWFpbCI6ImFkbWluQHN1YmNsdWIuY29tIiwicm9sZSI6ImFkbWluIiwidHlwZSI6InN5c3RlbSIsImFjY291bnRfc2x1ZyI6ImNhZmUtZG8tbm9ydGUiLCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTAwMDAwMDAwMH0.mock-sig';

export const MOCK_AUTH_RESPONSE = {
  data: { token: MOCK_JWT },
  message: 'Login realizado com sucesso'
};
