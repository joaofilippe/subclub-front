export interface Module {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
}

export interface ModuleRequest {
  name: string;
  active?: boolean;
}
