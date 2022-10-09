import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { LevelResponse } from "../../types/level/response";
import AdminFormErrors from "../AdminFormErrors";
import { AdminSectionContainer, AdminSectionTitle } from "../styled";

export const AdminLevelSection = () => {
  const [levels, setLevels] = useState<LevelResponse[]>([]);

  useEffect(() => {
    ApiAdaptor.listLevels({ page: 1 }).then(setLevels);
  }, []);

  const listLevels = () =>
    levels.map((level) => (
      <div className="p-1 " key={level.id}>
        <Link href={`/admin/level/${level.id}`}>
          <div
            id="row-container"
            className="align-center border-base-600 flex cursor-pointer justify-between rounded-full border bg-base-100 p-4 uppercase  drop-shadow hover:bg-base-300"
          >
            <div className="px-6 font-bold">{level.name}</div>
          </div>
        </Link>
      </div>
    ));

  return (
    <AdminSectionContainer id="course-admin">
      <div className="w-full text-center">
        <AdminSectionTitle className="p-2 text-xl font-bold uppercase">
          Levels
        </AdminSectionTitle>
      </div>
      <div id="courses-list-container">{listLevels()}</div>
      <div className="flex justify-center p-2 py-4">
        <Link href="/admin/level/">
          <div className="btn btn-accent">Create a Level</div>
        </Link>
      </div>
      <AdminFormErrors />
    </AdminSectionContainer>
  );
};
