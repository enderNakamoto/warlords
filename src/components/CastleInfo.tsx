import React, { useEffect, useState } from 'react';
import { getCastleDetails } from '@/view-functions/getCastleDetails';

// Add this interface
interface DefenseArmy {
  archers: string;
  cavalry: string;
  infantry: string;
}

interface CastleDetails {
  kingAddress: string;
  defenseArmy: DefenseArmy;
  weatherValue: number;
}

const CastleInfo: React.FC = () => {
  const [castleDetails, setCastleDetails] = useState<CastleDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCastleDetails = async () => {
      try {
        const details = await getCastleDetails();
        console.log('details', details);
        setCastleDetails(details);
      } catch (err) {
        setError('Failed to fetch castle details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCastleDetails();
  }, []);

  if (loading) return <div>Loading castle details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!castleDetails) return null;

  return (
    <div className="castle-info">
      <h2>Castle Information</h2>
      <p>King's Address: {castleDetails.kingAddress}</p>
      <h3>Defense Army:</h3>
      <ul>
        <li>Archers: {castleDetails.defenseArmy.archers}</li>
        <li>Cavalry: {castleDetails.defenseArmy.cavalry}</li>
        <li>Infantry: {castleDetails.defenseArmy.infantry}</li>
      </ul>
      <p>Weather Value: {castleDetails.weatherValue}</p>
    </div>
  );
};

export default CastleInfo;