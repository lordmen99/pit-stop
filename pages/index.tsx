import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '../components/Countdown';
import Navbar from '../components/Navbar';
import NEXTRACE from '../data/next-race.json';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import MarketplaceCard from '../components/MarketplaceCard';
import useWindowSize from '../hooks/useWindowSize';
import NFTCard from '../components/NFTCard';
import { useEffect, useState } from 'react';
import TEAMS from '../data/teams.json';

const Home: NextPage = () => {
  const { marketItems } = useSelector((state: RootState) => state.marketplace);

  const size = useWindowSize();

  const [teamKeyIndex, setTeamKeyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let newKey;
      if (teamKeyIndex == TEAMS.length - 1) newKey = 0;
      else newKey = teamKeyIndex + 1;
      setTeamKeyIndex(newKey);
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <div className="text-center text-red-700">
      <Head>
        <title>Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
      </Head>

      <Navbar />

      <div className="w-full md:mt-8 relative">
        <Image src={require(`../public/img/mesh.png`)} />
        <div className="left__hero">
          <div>
            <h1 className="text-white text-lg md:text-3xl lg:text-5xl font-bold md:w-96">
              Built for the love of Racing.
            </h1>
            <p className="text-white text-2xs md:text-base lg:text-xl mt-3 md:mt-10">
              Build your garage. Back your favourite drivers.
              <br />
              Get to the top of leaderboard.
              <br />
              Let&apos;s go racing.
            </p>

            <Link href="/mint">
              <button className="mt-3 md:mt-10 bg-gradient-to-r from-redOne to-redTwo rounded-lg px-10 py-2 font-semibold text-white text-2xs md:text-xl border-2 border-black">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div
          className="right__hero"
          style={{
            boxShadow: '0 0 50px #CB2D3E'
          }}
        >
          <ReactPlayer
            url="https://ipfs.infura.io/ipfs/Qme5wyu9XTLvZbmrX8BeHTzq8bJZo4bAJdRKfZxxFAJMht"
            loop={true}
            muted={true}
            playing={true}
            width={size.width >= 1280 ? 640 : size.width >= 1000 ? 533 : 320}
            height={size.width >= 1280 ? 360 : size.width >= 1000 ? 300 : 180}
            style={{
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          />
        </div>
      </div>

      <div className="w-full flex mx-auto text-white my-10 bg-gradient-to-r from-redTwo to-redTwo py-12 px-14">
        <div className="w-5/6 grid grid-cols-3 gap-x-4">
          <div className="flex flex-col border-l-2 border-white py-1 text-left pl-4">
            <h3 className="text-xl mb-2 font-bold">Get Your Liveries</h3>
            <p className="text-base">
              Mint your favorite liveries as NFTs and build your own car garage.
            </p>
          </div>
          <div className="flex flex-col border-l-2 border-white py-1 text-left pl-4">
            <h3 className="text-xl mb-2 font-bold">
              Back Your Driver & Constructor
            </h3>
            <p className="text-base">
              Use your minted NFT cars to back your favorite driver and
              constructor in the upcoming real world Grand Prix.
            </p>
          </div>
          <div className="flex flex-col border-l-2 border-white py-1 text-left pl-4">
            <h3 className="text-xl mb-2 font-bold">Climb The Ranks</h3>
            <p className="text-base">
              Score points across race weekends to increase your garage&apos;s
              score, make your NFTs more valuable, and climb the leaderboard.
            </p>
          </div>
        </div>
        <div className="w-1/6 flex justify-center items-center">
          <Link href="/about">
            <button className="border-2 border-white text-white text-lg font-semibold py-2 px-3 rounded-md">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full px-14 my-10">
        <h1 className="text-white text-3xl font-bold mt-4">Get Started</h1>
        <div className="mx-auto h-0.5 w-80 bg-gradient-to-r from-redOne to-redTwo mt-1 mb-3"></div>
        <div className="flex py-8">
          <div className="w-1/2 flex flex-col text-left px-6">
            <h3 className="mb-2 text-lg text-redOne font-bold">
              Step 1 : Connect your wallet
            </h3>
            <p className="text-white text-base">
              To get started, all you need to do is connect your wallet on the
              Polygon Mumbai Testnet.
            </p>
            <h3 className="mt-4 mb-2 text-lg text-redOne font-bold">
              Step 2 : Mint Your Liveries
            </h3>
            <p className="text-white text-base">
              Mint your favorite liveries as NFT cars from the{' '}
              <Link href="/mint">
                <a className="cursor-pointer text-redOne">Mint</a>
              </Link>{' '}
              page and use these to build your own garage.
            </p>
            <h3 className="mt-4 mb-2 text-lg text-redOne font-bold">
              Step 3 : Back your favorite driver and constructor
            </h3>
            <p className="text-white text-base">
              Use your minted NFTs to back your favorite driver and/or
              constructor on the grid in the upcoming real world Grand Prix from
              the{' '}
              <Link href="/compete">
                <a className="cursor-pointer text-redOne">Compete</a>
              </Link>{' '}
              page.
            </p>
            <h3 className="mt-4 mb-2 text-lg text-redOne font-bold">
              Step 4 : Score and claim points
            </h3>
            <p className="text-white text-base">
              After the race, the NFT that you backed your driver/constructor
              with gains points based on results of the race and you can{' '}
              <Link href="/compete">
                <a className="cursor-pointer text-redOne">Claim </a>
              </Link>
              these points.
            </p>
            <h3 className="mt-4 mb-2 text-lg text-redOne font-bold">
              Step 5 : Increase the value of your NFTs and climb the leaderboard
            </h3>
            <p className="text-white text-base">
              Keep backing your favorite drivers and constructors across race
              weekends to keep earning points. These points make your NFTs more
              valuable and also increase your total garage score which helps you
              to climb the{' '}
              <Link href="/leaderboard">
                <a className="cursor-pointer text-redOne">Leaderboard</a>
              </Link>
              .
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <NFTCard
              key={teamKeyIndex}
              compact
              team={TEAMS[teamKeyIndex].key}
            />
          </div>
        </div>
      </div>

      {marketItems && marketItems.length >= 3 && (
        <div className="w-full px-14">
          <div className="w-full flex justify-between">
            <div className="text-white text-3xl font-bold text-left">
              Trending Liveries
            </div>
            <Link href="/marketplace">
              <div className="flex items-center cursor-pointer text-gray-mute hover:border-b-2 hover:border-gray-mute text-xl font-bold">
                <span className="mr-3">Marketplace</span>
                <Image
                  src={require(`../public/img/arrow.svg`)}
                  width={26}
                  height={26}
                />
              </div>
            </Link>
          </div>
          <div className="flex my-8">
            {marketItems.slice(0, 3).map((item: any) => (
              <MarketplaceCard key={item.itemId} NFT={item} small />
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-redOne to-redTwo w-full py-10 mt-12">
        <h1 className="text-white text-center text-3xl font-bold">
          {NEXTRACE.name}
        </h1>
        <p className="text-white text-center text-lg mt-2">Starts In</p>
        <div className="w-1/4 mx-auto my-4">
          <Countdown timestamp={NEXTRACE.timestamp} />
        </div>
        <Link href="/compete">
          <button className="border-2 border-black bg-gradient-to-r from-redOne to-redTwo rounded-lg px-10 py-2 font-semibold text-white text-xl">
            Let&apos;s Go!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
