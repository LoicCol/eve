import short from "short-uuid";

export function encode(uuid: string) {
  const translator = short();
  return translator.fromUUID(uuid);
}

export function decode(shortUuid: string) {
  const translator = short();
  return translator.toUUID(shortUuid);
}
