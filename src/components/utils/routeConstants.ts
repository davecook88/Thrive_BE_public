import { ApiEndpoints } from "../../backend/apiAdaptor";

export class RouteCreator {
  static getBookCourseRoute(courseId: number) {
    return `${ApiEndpoints.bookCourse}/${courseId}`;
  }

  static listLevelCoursesRoute(levelId: number) {
    return `${ApiEndpoints.level}/${levelId}/courses`;
  }
}
