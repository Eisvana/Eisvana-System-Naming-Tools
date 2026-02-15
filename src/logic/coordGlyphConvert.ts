import { GalacticCoordinate as galacticCoordinate, PortalCode as portalCode } from '@nmscd/coordinate-conversion';

// coords to glyphs
export const coords2Glyphs = (coords: string): string =>
  galacticCoordinate({ code: coords }).toGlyph().value?.code ?? coords;

// glyphs to coords
export const glyphs2Coords = (glyphs: string) =>
  portalCode({ code: glyphs }).toGalacticCoordinates().value?.code ?? glyphs;
