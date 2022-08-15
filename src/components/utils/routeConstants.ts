import { ApiEndpoints } from "../../backend/apiAdaptor";

export class RouteCreator {
  static getBookCourseRoute(courseId: number) {
    return `${ApiEndpoints.bookCourse}/${courseId}`;
  }
}
