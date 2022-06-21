import React from "react";
import { EventPropGetter, Event } from "react-big-calendar";
import { AvailabilityCalendarEvent } from "..";

type StyleMap = Map<string, React.CSSProperties>;

export class AvailabilityAsEvent {
  static getStyle = (
    styleMap?: StyleMap
  ): EventPropGetter<AvailabilityCalendarEvent> =>
    function (event, start, end, isSelected) {
      const style: React.CSSProperties | undefined = styleMap?.get(
        event.status
      );

      return {
        style,
      };
    };
}