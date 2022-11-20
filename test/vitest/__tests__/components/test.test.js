/**
 * @vitest-enviroment happy-dom
 */

import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import test from "../demo/testVitest.vue";
// import cardPokemon from "../../../../src/components/cardPokemon.vue";

installQuasar();

describe("cardPokemon Test", () => {
  it("should mount correctly", () => {
    const wrapper = mount(test);
    //has h1
    expect(wrapper.find("h1").exists()).toBeTruthy();
    //has input
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    //has button
    expect(wrapper.find("button").exists()).toBeTruthy();
  });
  it("should send name filter", async () => {
    const wrapper = mount(test);
    await wrapper.find('input[type="text"]').setValue("Pikachu");
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("h1").text()).toEqual("Pikachu");
  });
  it("should mount header details", () => {
    const wrapper = mount(test);
    // has name
    const name = wrapper.find(".text-name");
    //has id
    const id = wrapper.find(".text-h6");
    expect(wrapper.find(".arrow-back").exists()).toBe(true);
    expect(wrapper.find(".img").exists()).toBe(true);
    expect(name.text()).toBe("Pikachu");
    expect(id.text()).toBe("25");
  });
});
