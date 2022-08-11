import { CourseMinimal } from "../course/responses";
import { UnitBase, LevelBase } from "./payloads";

export interface Level extends LevelBase {
  id: number;
}
export interface LevelResponse extends Level {
  name: string;
  description: string;
  difficulty: number;
  courses: CourseMinimal[];
  units: UnitResponse[];
}

export interface Unit extends UnitBase {
  id: number;
}

export interface UnitResponse extends Unit {
  courses: CourseMinimal[];
}
