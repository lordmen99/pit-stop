import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import GarageCard from '../../components/GarageCard';
import Navbar from '../../components/Navbar';
import { RootState } from '../../store/rootReducer';

const Garage: NextPage = () => {
  const { garage } = useSelector((state: RootState) => state.garage);
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="h-screen flex flex-col text-center text-red-700">
      <Head>
        <title>Garage | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-1/2 p-10">
          <div className="bg-gray w-full h-full rounded-lg p-10">
            <div className="flex w-full justify-center items-center">
              <div className="w-1/2">
                <Image
                  src={require(`../../public/img/teams/ferrari.png`)}
                  width={56}
                  height={56}
                />
              </div>
              <div className="flex flex-col text-left flex-1">
                <h1 className="text-white text-base">{user.username}</h1>
                <h1 className="text-white text-base">
                  Garage Points: {user.points}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-10">
          {garage.length > 0 ? (
            <div className="grid grid-cols-2 gap-10">
              {garage.map((garageItem: any) => (
                <GarageCard key={garageItem.itemId} NFT={garageItem} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h1 className="text-white text-center font-semibold text-lg">
                No cars minted yet!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Garage;
