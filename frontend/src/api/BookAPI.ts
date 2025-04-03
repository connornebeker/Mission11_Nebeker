import { Book } from '../types/Book';

interface fetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL =
  'https://mission13-nebeker-backend-gkcgcudhegd8aeah.eastus-01.azurewebsites.net/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<fetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ''
      }`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Books:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add Book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding Book:', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to update Book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating Book:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete Book');
    }
  } catch (error) {
    console.error('Error deleting Book:', error);
    throw error;
  }
};
