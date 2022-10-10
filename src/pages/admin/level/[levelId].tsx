import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../backend/apiAdaptor";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/redux/hooks";

import {
  selectAdmin,
  setSelectedLevel,
} from "../../../components/admin/adminSlice";
import LevelForm from "../../../components/admin/level/LevelForm";
import {
  LevelResponse,
  UnitResponse,
} from "../../../components/types/level/response";
import { DisplayUnitList } from "../../../components/admin/level/LevelForm/DisplayUnitsList";
import { UnitForm } from "../../../components/admin/level/LevelForm/UnitForm";
import UnauthorizedAccessPage from "../../../auth/UnauthorizedPage";
import { selectUser } from "../../../components/redux/reducers/user/userSlice";

const EditCoursePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query;
  const [units, setUnits] = useState<UnitResponse[]>([]);
  const _levelId = Array.isArray(query.levelId)
    ? query.levelId[0]
    : query.levelId;

  const { selectedLevel, selectedUnit } = useAppSelector(selectAdmin);

  const setLevel = (level: LevelResponse) =>
    dispatch(setSelectedLevel({ selectedLevel: level }));

  useEffect(() => {
    refresh();
  }, [query]);

  const refresh = async () => {
    if (!_levelId) return;

    const level = await ApiAdaptor.getLevelById(Number(_levelId));
    setLevel(level);
    ApiAdaptor.listUnits(level.id).then(setUnits);
  };

  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;

  if (!selectedLevel) return "loading";
  return (
    <div className="artboard-demo">
      <div className="mb-4 flex w-full justify-center pt-4">
        <h1 className="text-3xl font-bold uppercase">Edit level</h1>
      </div>
      <LevelForm level={selectedLevel} refresh={refresh} />
      <DisplayUnitList units={units} />
      <UnitForm
        unit={selectedUnit}
        unitNumber={selectedLevel?.units?.length + 1 || 1}
        level={selectedLevel}
        refresh={refresh}
      />
    </div>
  );
};

export default EditCoursePage;
