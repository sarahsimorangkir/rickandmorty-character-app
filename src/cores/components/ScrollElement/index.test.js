import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ScrollElement } from "./index.js";

describe("ScrollElement", () => {
  const characters = [
    { id: 1, name: "Character 1", image: "image1.jpg", status: "Alive", species: "Human", gender: "Male" },
    { id: 2, name: "Character 2", image: "image2.jpg", status: "Dead", species: "Alien", gender: "Female" },
  ];

  const doOnScrollBottomMock = jest.fn();
  const onClickCardMock = jest.fn();

  it("renders characters", () => {
    render(
      <ScrollElement
        height="500px"
        characters={characters}
        canScroll={true}
        doOnScrollBottom={doOnScrollBottomMock}
        onClickCard={onClickCardMock}
        isLoading={false}
        page={1}
      />
    );

    characters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  it("calls onClickCard when a character card is clicked", () => {
    render(
      <ScrollElement
        height="500px"
        characters={characters}
        canScroll={true}
        doOnScrollBottom={doOnScrollBottomMock}
        onClickCard={onClickCardMock}
        isLoading={false}
        page={1}
      />
    );

    fireEvent.click(screen.getByText(characters[0].name));

    expect(onClickCardMock).toHaveBeenCalledWith(characters[0].id);
  });

  
});
