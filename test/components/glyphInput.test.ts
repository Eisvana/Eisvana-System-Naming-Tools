import { type VueWrapper, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GlyphInputComponent from '@/components/GlyphInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { storeToRefs } from 'pinia';
import { usePrefixDataStore } from '@/stores/prefixData';

const GlyphInput = () => GlyphInputComponent;
describe(GlyphInput, () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia({ createSpy: vi.fn });

  beforeEach(() => {
    wrapper = mount(GlyphInputComponent, {
      global: {
        plugins: [pinia],
      },
      props: {
        error: false,
      },
    });
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when component is in error', async () => {
    await wrapper.setProps({
      error: true,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('updates glyphs.value when a button is clicked', async () => {
    const store = usePrefixDataStore(pinia);
    const { glyphs } = storeToRefs(store);
    const button = wrapper.find('button.button.glyphs');
    await button.trigger('click');

    expect(glyphs.value).toBe('0');
  });

  it('does not update glyphs.value when a bad value is entered', async () => {
    const store = usePrefixDataStore(pinia);
    const { glyphs } = storeToRefs(store);
    const input = wrapper.find('input[type="text"]');
    await input.setValue('h');

    expect(glyphs.value).toBe('');
  });

  it('converts coords to glyphs', async () => {
    const store = usePrefixDataStore(pinia);
    const { glyphValues } = storeToRefs(store);
    const input = wrapper.find('input[type="text"]');
    await input.setValue('0FFE:0021:090F:005E');

    expect(glyphValues.value).toBe('005EA21107FF');
  });

  it('keeps glyphs intact', async () => {
    const store = usePrefixDataStore(pinia);
    const { glyphValues } = storeToRefs(store);
    const input = wrapper.find('input[type="text"]');
    await input.setValue('005EA21107FF');

    expect(glyphValues.value).toBe('005EA21107FF');
  });

  it('removes glyph', async () => {
    const store = usePrefixDataStore(pinia);
    const { glyphs } = storeToRefs(store);
    const input = wrapper.find('input[type="text"]');
    await input.setValue('0');

    const button = wrapper.find('button#delButton');
    await button.trigger('click');

    expect(glyphs.value).toBe('');
  });
});
