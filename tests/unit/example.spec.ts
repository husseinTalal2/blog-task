import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";
import Grid from "@/components/Header.vue";

describe("Header.vue", () => {
  it("renders Header and contains 'BLOG POST' string", () => {
    const msg = "BLOG POST";
    const wrapper = shallowMount(Header, {
      props: {},
    });
    expect(wrapper.text()).to.include(msg);
  });
});
describe("Grid.vue", () => {
  it("renders the grid", () => {
    shallowMount(Grid, {
      props: {},
    });
  });
});
