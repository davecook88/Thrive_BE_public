import React from "react";
import { EventPropGetter, Event } from "react-big-calendar";
import { AvailabilityCalendarEvent } from "../types";

type StyleMap = Map<string, React.CSSProperties>;

export class AvailabilityAsEvent {
  static getStyle = (
    styleMap?: StyleMap
  ): EventPropGetter<AvailabilityCalendarEvent> =>
    function (event, start, end, isSelected) {
      return {};
    };
}
