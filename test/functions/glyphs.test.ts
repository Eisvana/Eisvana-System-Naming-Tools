import { describe, expect, it } from 'vitest';
import { getRandomGlyphs } from '@/logic/glyphs';
import { maxGlyphLength } from '@/variables/constants';

describe('glyphGenerator', () => {
  it('should have the correct output length', () => {
    expect(getRandomGlyphs().length).toBe(maxGlyphLength);
  });

  it('generates a valid hex number', () => {
    expect(Number.parseInt(getRandomGlyphs(), 16)).not.toBeNaN();
  });
});
