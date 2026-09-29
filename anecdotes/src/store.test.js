import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    update: vi.fn(),
    createNew: vi.fn(),
    deleteAnecdote: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, { useAnecdotes, useAnecdotesControls } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "", notification: null });
  vi.clearAllMocks();
});

describe("useAnecdotesActions", () => {
  it("verifies the state is initialized with the anecdotes", async () => {
    const mockAnecdote = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdote);

    const { result } = renderHook(() => useAnecdotesControls());

    await act(async () => {
      await result.current.setAnecdote();
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current).toEqual(mockAnecdote);
  });

  it("verifies the selector returns a properly filtered list of anecdotes based on the filter string", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Programming is fun", votes: 0 },
      { id: 1, content: "I like to listen music", votes: 0 },
      { id: 1, content: "React is the best frontend framework", votes: 0 },
    ];

    useAnecdoteStore.setState({
      anecdotes: mockAnecdotes,
      filter: "music",
      notification: null,
    });

    const { result } = renderHook(() => useAnecdotes());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].content).contains("I like to listen music");

    act(() =>
      useAnecdoteStore.setState({
        filter: "fun",
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].content).toBe("Programming is fun");
  });

  it("verifies the component displaying anecdotes receives the anecdotes from the store sorted by votes", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Programming is fun", votes: 0 },
      { id: 1, content: "I like to listen music", votes: 3 },
      { id: 1, content: "React is the best frontend framework", votes: 8 },
    ];

    useAnecdoteStore.setState({
      anecdotes: mockAnecdotes,
      filter: "",
      notification: null,
    });

    const { result } = renderHook(() => useAnecdotes());

    expect(result.current).toHaveLength(3);
    expect(result.current[0].content).toBe(
      "React is the best frontend framework",
    );
    expect(result.current[2].content).toBe("Programming is fun");
    expect(result.current[1].content).toBe("I like to listen music");
  });

  it("verifies that voting increases the number of votes for an anecdote", async () => {
    const anecdotes = [{ id: 1, content: "Test", votes: 0 }];

    useAnecdoteStore.setState({
      anecdotes: anecdotes,
      filter: "",
      notification: null,
    });

    anecdoteService.update.mockResolvedValue({
      ...anecdotes[0],
      votes: anecdotes[0].votes + 1,
    });

    const { result } = renderHook(() => useAnecdotesControls());

    await act(async () => {
      await result.current.addVote(1);
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current[0].votes).toBe(1);
  });
});
