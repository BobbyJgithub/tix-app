import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk } from '../../redux/eventsSlice';
import EventCard from '../../components/EventCard/EventCard';
import styles from './Home.module.css';
import { fetchPopularEvents, fetchPopularAttractions } from '../../utils/api';

function Home() {
  const dispatch = useDispatch();
  const { events, isLoading: isSearchLoading, hasError } = useSelector((state) => state.events);
  const [popularEvents, setPopularEvents] = useState([]);
  const [popularAttractions, setPopularAttractions] = useState([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularContent = async () => {
      try {
        setIsLoadingPopular(true);
        const [events, attractions] = await Promise.all([
          fetchPopularEvents(),
          fetchPopularAttractions()
        ]);
        setPopularEvents(events);
        setPopularAttractions(attractions);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingPopular(false);
      }
    };

    fetchPopularContent();
  }, []);

  const searchResults = events.length > 0 && (
    <>
      {events.filter(item => item.type === 'event').length > 0 && (
        <div className={styles["section"]}>
          <h2>Search Results - Events</h2>
          <div className={styles["events-container"]}>
            {events.filter(item => item.type === 'event').map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {events.filter(item => item.type === 'attraction').length > 0 && (
        <div className={styles["section"]}>
          <h2>Search Results - Attractions</h2>
          <div className={styles["events-container"]}>
            {events.filter(item => item.type === 'attraction').map((attraction) => (
              <EventCard key={attraction.id} event={attraction} />
            ))}
          </div>
        </div>
      )}
    </>
  );

  const popularContent = !isLoadingPopular && (
    <>
      <div className={styles["section"]}>
        <h2>Popular Events</h2>
        <div className={styles["events-container"]}>
          {popularEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className={styles["section"]}>
        <h2>Popular Attractions</h2>
        <div className={styles["events-container"]}>
          {popularAttractions.map((attraction) => (
            <EventCard key={attraction.id} event={attraction} />
          ))}
        </div>
      </div>
    </>
  );

  if (isSearchLoading && isLoadingPopular) return <p>Loading...</p>;
  if (hasError || error) return <p>Error: {hasError || error}</p>;

  return (
    <div>
      {searchResults}
      {!events.length && popularContent}
    </div>
  );
}

export default Home;