import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { describe, expect, it, beforeEach, vi } from "vitest";

import headerDetails from "/src/components/componentsDetails/headerDetails.vue";

installQuasar();

describe("headerDetails Test", () => {
  it("should mount correctly", () => {
    const wrapper = mount(headerDetails, {
      propsData: {
        name: "Pikachu",
        id: 25,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      },
    });

    // console.log(wrapper.html())
    //has arrow-back
    expect(wrapper.find(".arrow-back").exists()).toBeTruthy();
    //has name
    const textName = wrapper.find(".text-name");
    //has name
    const idPokemon = wrapper.find(".text-h6");
    //has img pokemon
    const img = wrapper.find(".q-img__image");

    // EXPECT
    expect(idPokemon.text()).toBe("25");
    expect(textName.text()).toBe("Pikachu");
    expect(img.attributes().src).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    );
  });
});
