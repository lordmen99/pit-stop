import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import GarageCard from '../../components/GarageCard';
import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';
import { RootState } from '../../store/rootReducer';

const Garage: NextPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState(TABS.Minted);

  return (
    <div className="h-screen flex flex-col text-center text-red-700">
      <Head>
        <title>Garage | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-2/5 p-10">
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
            <div className="w-36 mt-5">
              <h1 className="text-white text-xl font-semibold text-left">
                Race History
              </h1>
              <div className="h-0.5 mt-1 my-3 w-full bg-gradient-to-r from-redOne to-redTwo"></div>
            </div>
            {user.history && user.history.length > 0 ? (
              <div className="w-full grid grid-cols-3">
                <h3 className="text-left text-white text-base font-bold">
                  Driver
                </h3>
                <h3 className="text-left text-white text-base font-bold">
                  Race
                </h3>
                <h3 className="text-left text-white text-base font-bold">
                  Points
                </h3>
                {user.history
                  .slice(0)
                  .reverse()
                  .map((gp: any) => (
                    <>
                      <h3 className="text-left capitalize text-white text-sm">
                        {gp.driver.replace('-', ' ')}
                      </h3>
                      <h3 className="text-left text-white text-sm">
                        {gp.race}
                      </h3>
                      <h3 className="text-left text-white text-sm">
                        {gp.points}
                      </h3>
                    </>
                  ))}
              </div>
            ) : (
              <h1 className="text-center my-10 text-white text-sm">
                No race history to show
              </h1>
            )}
          </div>
        </div>

        <div className="w-3/5 p-10">
          <div className="flex w-1/2 justify-between">
            <h1
              onClick={() => setTab(TABS.Minted)}
              className="cursor-pointer text-white text-xl font-semibold text-left"
            >
              Minted
            </h1>
            <h1
              onClick={() => setTab(TABS.Purchased)}
              className="cursor-pointer text-white text-xl font-semibold text-left"
            >
              Purchased
            </h1>
            <h1
              onClick={() => setTab(TABS.Listed)}
              className="cursor-pointer text-white text-xl font-semibold text-left"
            >
              Listed
            </h1>
          </div>
          {tab === TABS.Minted && <MintedNFTs />}
          {tab === TABS.Purchased && <PurchasedNFTs />}
          {tab === TABS.Listed && <ListedNFTs />}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Garage);

enum TABS {
  Minted,
  Purchased,
  Listed
}

const MintedNFTs = () => {
  const { garage } = useSelector((state: RootState) => state.garage);

  return garage.length > 0 ? (
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
  );
};

const PurchasedNFTs = () => {
  const { purchasedItems } = useSelector(
    (state: RootState) => state.marketplace
  );

  return purchasedItems.length > 0 ? (
    <div className="grid grid-cols-2 gap-10">
      {purchasedItems.map((purchasedItem: any) => (
        <GarageCard key={purchasedItem.itemId} NFT={purchasedItem} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-white text-center font-semibold text-lg">
        No cars purchased yet!
      </h1>
    </div>
  );
};

const ListedNFTs = () => {
  const { listedItems } = useSelector((state: RootState) => state.marketplace);

  return listedItems.length > 0 ? (
    <div className="grid grid-cols-2 gap-10">
      {listedItems.map((listedItem: any) => (
        <GarageCard key={listedItem.itemId} NFT={listedItem} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-white text-center font-semibold text-lg">
        No cars listed yet!
      </h1>
    </div>
  );
};
