import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GarageCard from '../../components/GarageCard';
import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';
import { RootState } from '../../store/rootReducer';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import useUser from '../../hooks/useUser';
import { signOut } from '../../store/auth/actions';
import { useRouter } from 'next/router';
import { TailSpin } from 'react-loader-spinner';
//@ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const Garage: NextPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { address, token } = useSelector((state: RootState) => state.auth);
  const { leaderboard } = useSelector((state: RootState) => state.leaderboard);
  const { bootLoading } = useSelector((state: RootState) => state.boot);

  const dispatch = useDispatch();
  const router = useRouter();

  const rank = useMemo(
    () => leaderboard.findIndex((item: any) => item.address == address) + 1,
    [leaderboard]
  );

  const [tab, setTab] = useState(TABS.Garage);

  const [isUploadImageDisabled, setIsUploadImageDisabled] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const [username, setUsername] = useState(user.username);

  useEffect(() => {
    setUsername(user.username);
  }, [user]);

  const { changeProfilePhoto, changeUsername } = useUser();

  function signOutUser() {
    dispatch(signOut());
    router.push('/');
  }

  async function submitChangeUsername() {
    setIsEditingUsername(false);
    await changeUsername(token, username);
  }

  async function onImageUpload(e: any) {
    setIsUploadImageDisabled(true);

    const file = e.target.files[0];

    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`)
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      await changeProfilePhoto(token, url);
      setIsUploadImageDisabled(false);
    } catch (error) {
      console.log('Error uploading Image file: ', error);
    }
  }

  function openImageInput() {
    var inputEl = document.getElementById('Image-upload');
    inputEl?.click();
  }

  const { garage } = useSelector((state: RootState) => state.garage);

  const { listedItems } = useSelector((state: RootState) => state.marketplace);

  const [isDriverHistoryExpanded, setIsDriverHistoryExpanded] = useState(false);
  const [isConstructorHistoryExpanded, setIsConstructorHistoryExpanded] =
    useState(false);

  const driverHistory = useMemo(() => {
    if (user.history && user.history.length > 0) {
      const fullDriverHistory = user.history
        .slice(0)
        .reverse()
        .filter((gp: any) => gp.driver);

      if (isDriverHistoryExpanded) return fullDriverHistory;
      else return fullDriverHistory.slice(0, 3);
    }

    return [];
  }, [user.history, isDriverHistoryExpanded]);

  const constructorHistory = useMemo(() => {
    if (user.history && user.history.length > 0) {
      const fullConstructorHistory = user.history
        .slice(0)
        .reverse()
        .filter((gp: any) => !gp.driver);

      if (isConstructorHistoryExpanded) return fullConstructorHistory;
      else return fullConstructorHistory.slice(0, 3);
    }

    return [];
  }, [user.history, isConstructorHistoryExpanded]);

  return (
    <div className="h-screen flex flex-col text-center text-red-700">
      <Head>
        <title>Garage | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
      </Head>
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-2/5 p-10">
          <div
            className="bg-gray w-full h-full rounded-lg p-10"
            style={{ boxShadow: '0px -3px 86px 0px #00000080' }}
          >
            <div className="flex w-full justify-center items-start">
              <div className="w-1/2">
                <div className="rounded-lg overflow-hidden mx-auto w-40 h-40">
                  {user.pfp && (
                    <Image src={user.pfp} width={160} height={160} />
                  )}
                </div>
                <div className="" onClick={openImageInput}>
                  <input
                    type="file"
                    id="Image-upload"
                    className="w-full h-full hidden"
                    onChange={onImageUpload}
                    disabled={isUploadImageDisabled}
                  />
                  <h1 className="text-white text-sm text-center cursor-pointer hover:underline mt-3">
                    Edit profile photo
                  </h1>
                </div>
              </div>
              <div className="flex flex-col justify-start text-left flex-1 pt-2">
                <div className="my-2 text-white text-2xl font-bold w-full flex justify-between items-center">
                  {isEditingUsername ? (
                    <form onSubmit={submitChangeUsername}>
                      <input
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size={10}
                        className="bg-background outline-none border-none text-white"
                      />
                    </form>
                  ) : (
                    <span>
                      {username && username.length > 10
                        ? `${username.substring(0, 10)}...`
                        : username}
                    </span>
                  )}
                  <div
                    onClick={() => setIsEditingUsername(true)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={require(`../../public/img/edit.svg`)}
                      width={21}
                      height={21}
                    />
                  </div>
                </div>
                <h1 className="my-2 text-redOne text-base w">
                  {user.address &&
                    `${user.address.substring(0, 5)}...${user.address.substring(
                      user.address.length - 3
                    )}`}
                </h1>
                <h1 className="my-2 text-white text-xl font-semibold">
                  Points: <span className="text-redOne">{user.points}</span>
                </h1>
                <h1 className="my-2 text-white text-xl font-semibold">
                  Rank: <span className="text-redOne">{rank}</span>
                </h1>
                <span
                  onClick={signOutUser}
                  className="my-2 text-white hover:text-redOne text-sm font-semibold hover:underline cursor-pointer"
                >
                  Sign Out
                </span>
              </div>
            </div>
            <div className="w-36 mt-8 mb-5">
              <h1 className="text-white text-xl font-semibold text-left">
                Race History
              </h1>
              <div className="h-0.5 mt-1 my-3 w-full bg-gradient-to-r from-redOne to-redTwo"></div>
            </div>
            {user.history && user.history.length > 0 ? (
              <div>
                <div className="my-2 w-full grid grid-cols-3 gap-x-3 gap-y-2">
                  <h3 className="text-left text-white text-lg font-bold">
                    Driver
                  </h3>
                  <h3 className="text-left text-white text-lg font-bold">
                    Race
                  </h3>
                  <h3 className="text-left text-white text-lg font-bold">
                    Points
                  </h3>
                </div>
                {driverHistory.map((gp: any, i: number) => (
                  <div
                    key={i}
                    className="my-2 w-full grid grid-cols-3 gap-x-3 gap-y-2"
                  >
                    <h3 className="text-left capitalize text-white text-sm">
                      {gp.driver.replace('-', ' ')}
                    </h3>
                    <h3 className="text-left text-white text-sm">{gp.race}</h3>
                    <h3 className="text-left text-white text-sm">
                      {gp.points}
                    </h3>
                  </div>
                ))}
                {isDriverHistoryExpanded ? (
                  <div
                    onClick={() => setIsDriverHistoryExpanded(false)}
                    className="text-redOne text-sm mt-4 hover:underline cursor-pointer text-right pr-12"
                  >
                    Show Less
                  </div>
                ) : (
                  <div
                    onClick={() => setIsDriverHistoryExpanded(true)}
                    className="text-redOne text-sm mt-4 hover:underline cursor-pointer text-right pr-12"
                  >
                    Show More
                  </div>
                )}
                <div className="my-2 mt-8 w-full grid grid-cols-3 gap-x-3 gap-y-2">
                  <h3 className="text-left text-white text-lg font-bold">
                    Constructor
                  </h3>
                  <h3 className="text-left text-white text-lg font-bold">
                    Race
                  </h3>
                  <h3 className="text-left text-white text-lg font-bold">
                    Points
                  </h3>
                </div>
                {constructorHistory.map((gp: any, i: number) => (
                  <div
                    key={i}
                    className="my-2 w-full grid grid-cols-3 gap-x-3 gap-y-2"
                  >
                    <h3 className="text-left capitalize text-white text-sm">
                      {gp.constructor.replace('-', ' ')}
                    </h3>
                    <h3 className="text-left text-white text-sm">{gp.race}</h3>
                    <h3 className="text-left text-white text-sm">
                      {gp.points}
                    </h3>
                  </div>
                ))}
                {isConstructorHistoryExpanded ? (
                  <div
                    onClick={() => setIsConstructorHistoryExpanded(false)}
                    className="text-redOne text-sm mt-4 hover:underline cursor-pointer text-right pr-12"
                  >
                    Show Less
                  </div>
                ) : (
                  <div
                    onClick={() => setIsConstructorHistoryExpanded(true)}
                    className="text-redOne text-sm mt-4 hover:underline cursor-pointer text-right pr-12"
                  >
                    Show More
                  </div>
                )}
              </div>
            ) : (
              <h1 className="text-center my-16 text-white text-sm">
                No race history to show
              </h1>
            )}
          </div>
        </div>
        <div className="w-3/5 p-10">
          {!bootLoading ? (
            <>
              <div className="flex w-1/2 xl:w-1/3 justify-between">
                <h1
                  onClick={() => setTab(TABS.Garage)}
                  className={`cursor-pointer text-white text-2xl font-semibold text-left ${
                    tab === TABS.Garage && 'border-b-2 border-redOne pb-1.5'
                  }`}
                >
                  Garage{' '}
                  <span className="text-base ml-2 text-gray-mute">
                    {garage.length}
                  </span>
                </h1>
                <h1
                  onClick={() => setTab(TABS.OnSale)}
                  className={`cursor-pointer text-white text-2xl font-semibold text-left ${
                    tab === TABS.OnSale && 'border-b-2 border-redOne pb-1.5'
                  }`}
                >
                  On Sale{' '}
                  <span className="text-base ml-2 text-gray-mute">
                    {listedItems.length}
                  </span>
                </h1>
              </div>
              {tab === TABS.Garage && <GarageNFTs garage={garage} />}
              {tab === TABS.OnSale && <OnSaleNFTs listedItems={listedItems} />}
            </>
          ) : (
            <div className="flex w-full h-full justify-center items-center">
              <TailSpin color="#EF473A" height={80} width={80} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Garage);

enum TABS {
  Garage,
  OnSale
}

const GarageNFTs = ({ garage }: IGarageNFTsProps) => {
  return garage.length > 0 ? (
    <div className="mt-10 grid grid-cols-2 gap-10">
      {garage.map((ownedItem: any) => (
        <GarageCard link="garage" key={ownedItem.itemId} NFT={ownedItem} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-white text-center font-semibold text-lg">
        No cars in your garage yet!
      </h1>
    </div>
  );
};

const OnSaleNFTs = ({ listedItems }: IOnSaleNFTsProps) => {
  return listedItems.length > 0 ? (
    <div className="mt-10 grid grid-cols-2 gap-10">
      {listedItems.map((listedItem: any) => (
        <GarageCard
          link="marketplace"
          key={listedItem.itemId}
          NFT={listedItem}
        />
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

interface IGarageNFTsProps {
  garage: any;
}

interface IOnSaleNFTsProps {
  listedItems: any;
}
