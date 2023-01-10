/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  DateTime,
  DateTimeInput,
  Serializer,
  mapDateTimeSerializer,
} from '@lorisleiva/js-core';

/** Guard that sets a specific start date for the mint. */
export type StartDate = { date: DateTime };

export type StartDateArgs = { date: DateTimeInput };

export function getStartDateSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<StartDateArgs, StartDate> {
  const s = context.serializer;
  return s.struct<StartDate>(
    [['date', mapDateTimeSerializer(s.i64)]],
    'StartDate'
  ) as Serializer<StartDateArgs, StartDate>;
}
