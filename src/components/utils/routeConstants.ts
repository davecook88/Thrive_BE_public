import { ApiEndpoints } from "../../backend/constants";

export class RouteCreator {
  static getBookCourseRoute(courseId: number) {
    return `${ApiEndpoints.bookCourse}/${courseId}`;
  }

  static listLevelCoursesRoute(levelId: number) {
    return `${ApiEndpoints.level}/${levelId}/courses`;
  }

  static userMeRoute() {
    return `${ApiEndpoints.user}/me`;
  }
}
