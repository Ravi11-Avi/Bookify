import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseFirebase } from '../Context/Firebase';
import BookCard from '../Components/Card';
import { Loading } from '../Components/Loading';

const SearchPage = () => {
    const params = useParams(); // Changed from Prams to params (convention)
    const firebase = UseFirebase();
    const [searchWord, setSearchWord] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [loading, setLoading] = useState(false);

    const searchBook = async () => {
        if (!searchWord.trim()) return;
        
        try {
            setLoading(true);
            const books = await firebase.Searchbook(searchWord);
            setSearchResult(books || {});
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to load search results");
            setSearchResult({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.Bookname) {
            setSearchWord(params.Bookname);
        }
    }, [params.Bookname]);

    useEffect(() => {
        if (searchWord) {
            searchBook();
        }
    }, [searchWord]); 

    const results = Object.entries(searchResult);

    if (loading) return <Loading/>
   

    return (
        <div className="p-4">
            <div className="flex gap-2 mb-6">
                <h1 className="text-xl font-semibold">Search Results for</h1>
                <span className="text-xl font-bold">"{params.Bookname}"</span>
            </div>

            <div className="flex flex-wrap gap-4">
                {results.length > 0 ? (
                    results.map(([key, book]) => (
                        <BookCard 
                            key={book.id} 
                            id={book.id}  
                            link={`/book/Details/${book.id}`}  
                            work={"Show Details"} 
                            {...book}
                        />
                    ))
                ) : (
                    <div className=' w-full flex gap-2 justify-center'>
                        <p className="text-xl font-semibold" >No results found for</p>
                        <span  className="text-xl font-bold">"{params.Bookname}"</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;