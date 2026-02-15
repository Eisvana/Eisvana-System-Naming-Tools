import { type VueWrapper, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import PrefixGeneratorComponent from '@/components/PrefixGenerator.vue';
import { createTestingPinia } from '@pinia/testing';
import { storeToRefs } from 'pinia';
import { usePrefixDataStore } from '@/stores/prefixData';

const PrefixGenerator = () => PrefixGeneratorComponent;
describe(PrefixGenerator, () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();

  beforeEach(() => {
    wrapper = mount(PrefixGeneratorComponent, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should reset data on button click', async () => {
    const store = usePrefixDataStore(pinia);
    const { glyphs, systemName } = storeToRefs(store);
    glyphs.value = '0001A21117FF';
    systemName.value = 'Hello World';
    const button = wrapper.find('button.reset-button');
    await button.trigger('click');

    expect(glyphs.value).toBe('');
    expect(systemName.value).toBe('');
  });

  it('should have the correct label', () => {
    const output = wrapper.find('.output-label');

    expect(output.text()).toBe('Prefix:');
  });

  it('should have the correct label', async () => {
    const systemInput = wrapper.find('#systemName');
    const glyphInput = wrapper.find('#portalglyphsInput');
    const output = wrapper.find('.prefix-output');
    await systemInput.setValue('Hello World');
    await glyphInput.setValue('0001A21117FF');

    expect(output.text()).toBe('EV1-1 Hello World');
  });
});
