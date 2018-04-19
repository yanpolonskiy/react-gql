import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const AddBook = props => {
  let authors = <option disabled>Authors loading...</option>;
  if (props.data.authors) {
    authors = props.data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }
  return (
    <form>
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>{authors}</select>
      </div>
      <button>Add Book</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);