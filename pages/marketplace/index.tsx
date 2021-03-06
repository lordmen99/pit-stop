import type { NextPage } from 'next';
import Head from 'next/head';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import MarketplaceCard from '../../components/MarketplaceCard';
import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';
import { RootState } from '../../store/rootReducer';

const Marketplace: NextPage = () => {
  const { marketItems } = useSelector((state: RootState) => state.marketplace);
  const { bootLoading } = useSelector((state: RootState) => state.boot);

  return (
    <div className="h-screen flex flex-col text-center text-red-700">
      <Head>
        <title>Marketplace | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
      </Head>

      <Navbar />
      <div className="flex-1 flex flex-col">
        <h1 className="text-white text-3xl font-semibold mt-4">Marketplace</h1>
        <div className="mx-auto h-0.5 w-80 bg-gradient-to-r from-redOne to-redTwo mt-1 mb-4"></div>

        {bootLoading ? (
          <div className="flex w-full flex-1 justify-center items-center">
            <TailSpin color="#EF473A" height={80} width={80} />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-5 w-5/6 xl:w-3/4 mx-auto mb-10">
            {marketItems.map((item: any) => (
              <MarketplaceCard key={item.itemId} NFT={item} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default withAuth(Marketplace);
