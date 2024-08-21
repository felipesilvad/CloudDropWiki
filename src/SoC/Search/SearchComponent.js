import React, { useState } from 'react';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const results = await searchAcrossCollections(searchTerm);
    setSearchResults(results);
  };

  const searchAcrossCollections = async (searchTerm) => {
    const results = [];
  
    // Define the collections you want to search
    const collectionsToSearch = ['collection1', 'collection2', 'collection3'];
  
    for (const col of collectionsToSearch) {
      const q = query(
        collection(db, col),
        where('yourField', '>=', searchTerm),
      );
  
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
    }
  
    return results;
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            {/* Render your search result here */}
            <p>{result.yourField}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
