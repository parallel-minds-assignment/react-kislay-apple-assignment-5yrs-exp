import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../pages/Home";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "../../store";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import { useTheme } from "../../hooks/useTheme";

// Mocking hooks
jest.mock('../../hooks/useMovieSearch', () => ({
  useMovieSearch: jest.fn(),
}));

jest.mock('../../hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

// Mock components
jest.mock("../../components/MovieModal", () => ({
  __esModule: true,
  default: () => <div data-testid="movie-modal">Modal Content</div>,
}));

const renderWithStore = (
  component: React.ReactNode,
  stateOverrides = {}
) => {
  const mockStore = configureMockStore<Partial<RootState>>();
  const store = mockStore({
    movies: {
      movies: [
        {
          imdbID: "tt1234567",
          Title: "Test Movie",
          Poster: "test.jpg",
          Year: "2023",
          Type: "movie",
        },
      ],
      movieDetailsCache: {
        tt1234567: {
          imdbID: "tt1234567",
          Title: "Test Movie",
          Plot: "A great test movie plot.",
          Rated: "PG-13",
          Released: "01 Jan 2023",
          Runtime: "120 min",
          Genre: "Action",
          Director: "Test Director",
          Writer: "Test Writer",
          Actors: "Test Actor",
          Language: "English",
          Country: "USA",
          Awards: "None",
          Ratings: [],
          Metascore: "75",
          imdbRating: "8.0",
          Year: "2023",
          Type: "movie",
          Poster: "test.jpg",
        },
      },
      selectedMovie: null,
      isLoading: false,
      error: null,
    },
    ...stateOverrides,
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

describe("Home", () => {
  const mockToggleTheme = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockFetchDetails = jest.fn();
  const mockFetchMoreMovies = jest.fn();

  beforeEach(() => {
    mockToggleTheme.mockClear();
    mockHandleSearch.mockClear();
    mockFetchDetails.mockClear();
    mockFetchMoreMovies.mockClear();

    (useMovieSearch as jest.Mock).mockReturnValue({
      isInitialLoading: false,
      isFetchingMore: false,
      hasSearched: false,
      handleSearch: mockHandleSearch,
      fetchMoreMovies: mockFetchMoreMovies,
      fetchDetails: mockFetchDetails,
      hasMore: true,
    });

    (useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      toggleTheme: mockToggleTheme,
    });
  });

  it("renders the Home component", () => {
    renderWithStore(<Home />);
    expect(screen.getByText("Search Movies")).toBeInTheDocument();
    expect(screen.getByTestId("movie-modal")).toBeInTheDocument();
  });

  it("toggles the theme when ThemeToggle is clicked", () => {
    renderWithStore(<Home />);
    const themeToggleButton = screen.getByRole("button");
    fireEvent.click(themeToggleButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("calls handleSearch when a search query is entered", () => {
    renderWithStore(<Home />);
    const searchBox = screen.getByRole("textbox");
    fireEvent.change(searchBox, { target: { value: "Inception" } });
    fireEvent.keyPress(searchBox, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockHandleSearch).toHaveBeenCalledWith("Inception");
  });

  it("calls fetchMoreMovies when scroll reaches bottom", async () => {
    renderWithStore(<Home />);
    
    // Mock scroll event
    const originalScrollY = window.scrollY;
    const originalInnerHeight = window.innerHeight;
    const originalScrollHeight = document.documentElement.scrollHeight;
    
    // Set up values that would trigger infinite scroll
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(mockFetchMoreMovies).toHaveBeenCalledTimes(1);
    });
    
    // Restore original values
    Object.defineProperty(window, 'scrollY', { value: originalScrollY, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: originalScrollHeight, configurable: true });
  });

  it("renders MovieList when search has occurred", () => {
    // Override useMovieSearch for this test
    (useMovieSearch as jest.Mock).mockReturnValueOnce({
      isInitialLoading: false,
      isFetchingMore: false,
      hasSearched: true, // ✅ Force rendering MovieList
      handleSearch: mockHandleSearch,
      fetchMoreMovies: mockFetchMoreMovies,
      fetchDetails: mockFetchDetails,
      hasMore: true,
    });

    renderWithStore(<Home />);
    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
  });

  it("shows loading state when searching", () => {
    // Override useMovieSearch for this test
    (useMovieSearch as jest.Mock).mockReturnValueOnce({
      isInitialLoading: true,
      isFetchingMore: false,
      hasSearched: true,
      handleSearch: mockHandleSearch,
      fetchMoreMovies: mockFetchMoreMovies,
      fetchDetails: mockFetchDetails,
      hasMore: true,
    });

    renderWithStore(<Home />);
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("displays no results message when search has no results", () => {
    // Override useMovieSearch for this test
    (useMovieSearch as jest.Mock).mockReturnValueOnce({
      isInitialLoading: false,
      isFetchingMore: false,
      hasSearched: true,
      handleSearch: mockHandleSearch,
      fetchMoreMovies: mockFetchMoreMovies,
      fetchDetails: mockFetchDetails,
      hasMore: false,
    });

    renderWithStore(
      <Home />,
      {
        movies: {
          movies: [],
          movieDetailsCache: {},
          selectedMovie: null,
          isLoading: false,
          error: null,
        },
      }
    );

    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("shows 'Load More' button when more results are available", () => {
    // Override useMovieSearch for this test
    (useMovieSearch as jest.Mock).mockReturnValueOnce({
      isInitialLoading: false,
      isFetchingMore: false,
      hasSearched: true,
      handleSearch: mockHandleSearch,
      fetchMoreMovies: mockFetchMoreMovies,
      fetchDetails: mockFetchDetails,
      hasMore: true,
    });

    renderWithStore(<Home />);
    const loadMoreButton = screen.getByText("Load More");
    expect(loadMoreButton).toBeInTheDocument();
    
    fireEvent.click(loadMoreButton);
    expect(mockFetchMoreMovies).toHaveBeenCalledTimes(1);
  });

  it("doesn't show 'Load More' button when no more results", () => {
    // Override useMovieSearch for this test
    (useMovieSearch as jest.Mock).mockReturnValueOnce({
      isInitialLoading: false,
      isFetchingMore: false,
      hasSearched: true,
      handleSearch: mockHandleSearch,
      fetchMoreMovies: mockFetchMoreMovies,
      fetchDetails: mockFetchDetails,
      hasMore: false,
    });

    renderWithStore(<Home />);
    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });
});