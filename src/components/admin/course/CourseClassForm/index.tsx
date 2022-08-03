import React, { useState } from "react";
import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { CourseClass } from "../../../types/course/responses";

interface CourseClassFormProps {
  courseClass?: CourseClass;
  classNumber: number;
}

export const CourseClassForm: React.FC<CourseClassFormProps> = ({
  classNumber,
}) => {
  const [name, setName] = useState(`Live Class ${classNumber}`);
  const [description, setDescription] = useState("");
  return (
    <StandardForm>
      <StandardFormBody>
        <FormSection>
          <div className="p-2">
            <label className="input-group">
              <span className="text-xs bg-secondary">Course Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name your class"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="p-2">
            <label className="input-group  h-25">
              <span className="text-xs bg-secondary">Description</span>
              <textarea
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This course focuses on..."
                className="input input-bordered w-full h-25"
              />
            </label>
          </div>
        </FormSection>
      </StandardFormBody>
    </StandardForm>
  );
};
