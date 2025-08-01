import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config.js';

function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/crud/listall`);
            setPlayers(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching players:', err);
            setError(err.response?.data || err.message);
            setLoading(false);
        }
    };

    const deletePlayer = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/crud/deletePlayer`, { data: { id } });
            fetchPlayers();
            console.log("Player id deleted:", id);
        } catch (err) {
            console.error('Error deleting player:', err);
            setError(err.response?.data || err.message);
        }
    };

    if (loading) return <div>Loading players...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {players.map(player => (
                <p key={player._id}>
                    <span>{player.email}</span>
                    <span>
                        <button onClick={() => deletePlayer(player._id)} />
                    </span>
                </p>
            ))}
        </div>
    );
}

export default PlayerList;
