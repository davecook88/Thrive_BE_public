/*
  @description: Date strings from the database are not automatically
  parsed as ISO time. This method adds a Z to the string to make sure that
  the correct time zone is applied
*/
export const parseDbTime = (dbString: string) => {
  return new Date(dbString + "Z");
};
