import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { LevelResponse } from "../../types/level/response";
import { AdminSectionContainer, AdminSectionTitle } from "../styled";

export const AdminLevelSection = () => {
  const [levels, setLevels] = useState<LevelResponse[]>([]);

  useEffect(() => {
    ApiAdaptor.listLevels({ page: 0 }).then(setLevels);
  }, []);

  const listLevels = () =>
    levels.map((level) => (
      <div className="p-1 " key={level.id}>
        <Link href={`/admin/level/${level.id}`}>
          <div
            id="row-container"
            className="flex justify-between align-center drop-shadow border border-base-600 bg-base-100 p-4 rounded-full hover:bg-base-300  cursor-pointer uppercase"
          >
            <div className="font-bold px-6">{level.name}</div>
          </div>
        </Link>
      </div>
    ));

  return (
    <AdminSectionContainer id="course-admin">
      <div className="w-full text-center">
        <AdminSectionTitle className="font-bold p-2 uppercase text-xl">
          Levels
        </AdminSectionTitle>
      </div>
      <div id="courses-list-container">{listLevels()}</div>
      <div className="flex justify-center p-2 py-4">
        <Link href="/admin/level/">
          <div className="btn btn-accent">Create a Level</div>
        </Link>
      </div>
    </AdminSectionContainer>
  );
};
