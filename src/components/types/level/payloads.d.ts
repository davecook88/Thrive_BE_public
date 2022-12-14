export interface LevelBase {
  name: string;
  description: string;
  difficulty: number;
  title: string;
  subtitle: string;
}

export interface CreateLevelPayload extends LevelBase {}

export interface UnitBase {
  name: string;
  description?: string;
  position: number;
}
export interface CreateUnitPayload extends UnitBase {
  level_id: number;
}
