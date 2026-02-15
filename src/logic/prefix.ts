import { regionGlyphs } from '@/variables/regions';
import { systemIndexLength } from '@/variables/constants';

export function getRegionNumber(glyphs: string): number {
  const regionGlyphsSubstring = glyphs.slice(4);
  const regionIndex = regionGlyphs.indexOf(regionGlyphsSubstring);
  return regionIndex + 1;
}

export function getPrefix(glyphs: string): string {
  const systemIndexString = glyphs.slice(1, 4);
  const systemIndex = Number.parseInt(systemIndexString, 16);
  const regionNumber = getRegionNumber(glyphs);
  if (!regionNumber || Number.isNaN(systemIndex) || systemIndexString.length !== systemIndexLength) return '';
  const expectedIndex = systemIndex.toString(16).toUpperCase();
  return `EV${regionNumber}-${expectedIndex}`;
}
