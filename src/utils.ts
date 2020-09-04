import * as Yaml from 'js-yaml';
import { ParsedOnion } from "./types";

export const readOnionYaml = (yaml:string): ParsedOnion[] => {
  const parsed: ParsedOnion[] = Yaml.safeLoadAll(yaml)

  // Confirm we got an array
  if(!Array.isArray(parsed)){
    throw new Error('Unexpected input');
  }

  return parsed
    // Filter out null values
    .filter(o => Boolean(o))
    .map(o => {
      // Confirm validity of data
      if(
        typeof o.hostname !== 'string'
        || typeof o.hs_ed25519_public_key !== 'string'
        || typeof o.hs_ed25519_secret_key !== 'string'
        || !(o.time instanceof Date)
      ){
        throw new Error('Unexpected input');
      }
      return o
    })
}
