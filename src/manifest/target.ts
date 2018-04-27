import { ok } from 'assert';
import { has, unixJoin, sanitize, isString } from '../utils';

export type TargetType = 'xlsx' | 'xlsm' | 'xlam';

export interface Target {
  name: string;
  type: TargetType;
  path: string;
  filename: string;
}

const EXAMPLE = `Example vba-block.toml:

  [targets]
  xlsm = "targets/xlsm"

  [targets.xlam]
  name = "addin"
  path = "targets/xlam"`;

export function parseTargets(
  values: any,
  pkgName: string,
  dir: string
): Target[] {
  return Object.entries(values).map(([type, value]) => {
    return parseTarget(<TargetType>type, value, pkgName, dir);
  });
}

export function parseTarget(
  type: TargetType,
  value: any,
  pkgName: string,
  dir: string
): Target {
  if (isString(value)) value = { path: value };
  if (!has(value, 'name')) value = { name: pkgName, ...value };
  const { name, path: relativePath } = value;

  ok(relativePath, `target of type "${type}" is missing path. ${EXAMPLE}`);

  const path = unixJoin(dir, relativePath);
  const filename = `${sanitize(name)}.${type}`;

  return { name, type, path, filename };
}
